import { aiAgentProviders } from "@/lib/ai-agent-data";

export async function syncAffiliateLinks(): Promise<{
  synced: number;
  total: number;
  broken: string[];
}> {
  const agents = aiAgentProviders.filter((a) => a.affiliateUrl);
  const total = agents.length;
  const broken: string[] = [];
  let synced = 0;

  await Promise.all(
    agents.map(async (agent) => {
      try {
        const response = await fetch(agent.affiliateUrl, {
          method: "HEAD",
          redirect: "follow",
          signal: AbortSignal.timeout(10_000),
        });

        if (
          response.status === 200 ||
          response.status === 301 ||
          response.status === 302
        ) {
          synced++;
        } else {
          broken.push(agent.slug);
        }
      } catch {
        broken.push(agent.slug);
      }
    })
  );

  return { synced, total, broken };
}

import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "ZeroToAIAgents - Learn, Compare & Master AI Coding Agents";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0f172a",
          backgroundImage:
            "radial-gradient(circle at 25px 25px, #1e293b 2%, transparent 0%), radial-gradient(circle at 75px 75px, #1e293b 2%, transparent 0%)",
          backgroundSize: "100px 100px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 40,
          }}
        >
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            style={{ marginRight: 20 }}
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
              fill="#f97316"
            />
            <path
              d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"
              fill="#ea580c"
            />
            <circle cx="12" cy="12" r="2" fill="#f97316" />
          </svg>
          <span
            style={{
              fontSize: 72,
              fontWeight: 800,
              background: "linear-gradient(to right, #f97316, #fb923c)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            ZeroToAIAgents
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: 32,
              color: "#e2e8f0",
              marginBottom: 16,
            }}
          >
            Learn, Compare & Master AI Coding Agents
          </span>
          <span
            style={{
              fontSize: 20,
              color: "#94a3b8",
              textAlign: "center",
              maxWidth: 800,
            }}
          >
            Expert reviews • Honest comparisons • AI-powered automation
          </span>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 40,
            display: "flex",
            alignItems: "center",
            gap: 30,
          }}
        >
          <span style={{ fontSize: 18, color: "#64748b" }}>
            zerotoaiagents.com
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

import { Resend } from "resend";

// Initialize Resend client
export const resend = new Resend(process.env.RESEND_API_KEY);

// Email sender configuration
export const EMAIL_FROM = "ZeroToAIAgents <hello@zerotoaiagents.com>";

// Email types
export type NewsletterWelcomeEmailProps = {
  email: string;
  language: string;
};

// Translations for welcome email
const welcomeEmailTranslations: Record<string, {
  subject: string;
  title: string;
  greeting: string;
  thankYou: string;
  whatToExpect: string;
  expectItems: string[];
  cta: string;
  footer: string;
  unsubscribe: string;
}> = {
  en: {
    subject: "Welcome to ZeroToAIAgents! 🔒",
    title: "Welcome to ZeroToAIAgents",
    greeting: "Hey there!",
    thankYou: "Thank you for subscribing to our newsletter. You're now part of a community that cares about online privacy and security.",
    whatToExpect: "Here's what you can expect from us:",
    expectItems: [
      "Exclusive VPN deals and discounts",
      "Security tips to keep you safe online",
      "Latest VPN reviews and comparisons",
      "Privacy news and updates",
    ],
    cta: "Browse VPN Deals",
    footer: "Stay safe online!",
    unsubscribe: "If you didn't subscribe to this newsletter, you can safely ignore this email.",
  },
  nl: {
    subject: "Welkom bij ZeroToAIAgents! 🔒",
    title: "Welkom bij ZeroToAIAgents",
    greeting: "Hallo!",
    thankYou: "Bedankt voor je aanmelding voor onze nieuwsbrief. Je maakt nu deel uit van een community die geeft om online privacy en veiligheid.",
    whatToExpect: "Dit kun je van ons verwachten:",
    expectItems: [
      "Exclusieve VPN-deals en kortingen",
      "Beveiligingstips om je online veilig te houden",
      "Nieuwste VPN-reviews en vergelijkingen",
      "Privacy nieuws en updates",
    ],
    cta: "Bekijk VPN Deals",
    footer: "Blijf veilig online!",
    unsubscribe: "Als je je niet hebt aangemeld voor deze nieuwsbrief, kun je deze e-mail veilig negeren.",
  },
  de: {
    subject: "Willkommen bei ZeroToAIAgents! 🔒",
    title: "Willkommen bei ZeroToAIAgents",
    greeting: "Hallo!",
    thankYou: "Vielen Dank für Ihre Anmeldung zu unserem Newsletter. Sie sind jetzt Teil einer Community, die sich um Online-Privatsphäre und Sicherheit kümmert.",
    whatToExpect: "Das können Sie von uns erwarten:",
    expectItems: [
      "Exklusive VPN-Angebote und Rabatte",
      "Sicherheitstipps für Ihre Online-Sicherheit",
      "Neueste VPN-Bewertungen und Vergleiche",
      "Datenschutz-News und Updates",
    ],
    cta: "VPN-Angebote ansehen",
    footer: "Bleiben Sie sicher online!",
    unsubscribe: "Wenn Sie sich nicht für diesen Newsletter angemeldet haben, können Sie diese E-Mail ignorieren.",
  },
  es: {
    subject: "¡Bienvenido a ZeroToAIAgents! 🔒",
    title: "Bienvenido a ZeroToAIAgents",
    greeting: "¡Hola!",
    thankYou: "Gracias por suscribirte a nuestro boletín. Ahora eres parte de una comunidad que se preocupa por la privacidad y seguridad en línea.",
    whatToExpect: "Esto es lo que puedes esperar de nosotros:",
    expectItems: [
      "Ofertas y descuentos exclusivos de VPN",
      "Consejos de seguridad para mantenerte seguro en línea",
      "Las últimas reseñas y comparaciones de VPN",
      "Noticias y actualizaciones de privacidad",
    ],
    cta: "Ver ofertas VPN",
    footer: "¡Mantente seguro en línea!",
    unsubscribe: "Si no te suscribiste a este boletín, puedes ignorar este correo.",
  },
  fr: {
    subject: "Bienvenue chez ZeroToAIAgents ! 🔒",
    title: "Bienvenue chez ZeroToAIAgents",
    greeting: "Bonjour !",
    thankYou: "Merci de vous être inscrit à notre newsletter. Vous faites maintenant partie d'une communauté qui se soucie de la confidentialité et de la sécurité en ligne.",
    whatToExpect: "Voici ce que vous pouvez attendre de nous :",
    expectItems: [
      "Offres et réductions VPN exclusives",
      "Conseils de sécurité pour rester en sécurité en ligne",
      "Dernières critiques et comparaisons VPN",
      "Actualités et mises à jour sur la confidentialité",
    ],
    cta: "Voir les offres VPN",
    footer: "Restez en sécurité en ligne !",
    unsubscribe: "Si vous ne vous êtes pas inscrit à cette newsletter, vous pouvez ignorer cet e-mail.",
  },
  zh: {
    subject: "欢迎加入 ZeroToAIAgents！🔒",
    title: "欢迎加入 ZeroToAIAgents",
    greeting: "您好！",
    thankYou: "感谢您订阅我们的通讯。您现在是一个关注在线隐私和安全的社区的一员。",
    whatToExpect: "您可以期待我们提供：",
    expectItems: [
      "独家VPN优惠和折扣",
      "保护您在线安全的安全提示",
      "最新的VPN评测和比较",
      "隐私新闻和更新",
    ],
    cta: "查看VPN优惠",
    footer: "保持在线安全！",
    unsubscribe: "如果您没有订阅此通讯，可以忽略此邮件。",
  },
  ja: {
    subject: "ZeroToAIAgentsへようこそ！🔒",
    title: "ZeroToAIAgentsへようこそ",
    greeting: "こんにちは！",
    thankYou: "ニュースレターにご登録いただきありがとうございます。オンラインプライバシーとセキュリティを大切にするコミュニティの一員になりました。",
    whatToExpect: "私たちから期待できること：",
    expectItems: [
      "限定VPNセールと割引",
      "オンラインで安全を保つためのセキュリティヒント",
      "最新のVPNレビューと比較",
      "プライバシーニュースとアップデート",
    ],
    cta: "VPNセールを見る",
    footer: "オンラインで安全に！",
    unsubscribe: "このニュースレターに登録していない場合は、このメールを無視してください。",
  },
  ko: {
    subject: "ZeroToAIAgents에 오신 것을 환영합니다! 🔒",
    title: "ZeroToAIAgents에 오신 것을 환영합니다",
    greeting: "안녕하세요!",
    thankYou: "뉴스레터를 구독해 주셔서 감사합니다. 이제 온라인 개인정보 보호와 보안에 관심을 가진 커뮤니티의 일원이 되셨습니다.",
    whatToExpect: "저희에게 기대할 수 있는 것:",
    expectItems: [
      "독점 VPN 거래 및 할인",
      "온라인에서 안전을 유지하기 위한 보안 팁",
      "최신 VPN 리뷰 및 비교",
      "개인정보 보호 뉴스 및 업데이트",
    ],
    cta: "VPN 거래 보기",
    footer: "온라인에서 안전하세요!",
    unsubscribe: "이 뉴스레터를 구독하지 않으셨다면 이 이메일을 무시하셔도 됩니다.",
  },
  th: {
    subject: "ยินดีต้อนรับสู่ ZeroToAIAgents! 🔒",
    title: "ยินดีต้อนรับสู่ ZeroToAIAgents",
    greeting: "สวัสดี!",
    thankYou: "ขอบคุณที่สมัครรับจดหมายข่าวของเรา คุณเป็นส่วนหนึ่งของชุมชนที่ใส่ใจเรื่องความเป็นส่วนตัวและความปลอดภัยออนไลน์",
    whatToExpect: "นี่คือสิ่งที่คุณสามารถคาดหวังจากเรา:",
    expectItems: [
      "ดีล VPN และส่วนลดพิเศษ",
      "เคล็ดลับความปลอดภัยเพื่อให้คุณปลอดภัยออนไลน์",
      "รีวิวและเปรียบเทียบ VPN ล่าสุด",
      "ข่าวสารและอัปเดตด้านความเป็นส่วนตัว",
    ],
    cta: "ดูดีล VPN",
    footer: "รักษาความปลอดภัยออนไลน์!",
    unsubscribe: "หากคุณไม่ได้สมัครรับจดหมายข่าวนี้ คุณสามารถเพิกเฉยอีเมลนี้ได้",
  },
};

// Generate welcome email HTML
export function generateWelcomeEmailHtml({ language }: NewsletterWelcomeEmailProps): string {
  const t = welcomeEmailTranslations[language] || welcomeEmailTranslations.en;
  const baseUrl = "https://zerotoaiagents.com";
  const dealsUrl = `${baseUrl}/${language === 'en' ? '' : language + '/'}deals`;

  return `
<!DOCTYPE html>
<html lang="${language}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${t.subject}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0f172a; -webkit-font-smoothing: antialiased;">
  <!-- Preheader text (hidden) -->
  <div style="display: none; max-height: 0; overflow: hidden;">
    ${t.thankYou.substring(0, 100)}...
  </div>

  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #0f172a;">
    <tr>
      <td align="center" style="padding: 40px 20px;">

        <!-- Main Container -->
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse;">

          <!-- Logo Header -->
          <tr>
            <td align="center" style="padding: 0 0 32px;">
              <table role="presentation" style="border-collapse: collapse;">
                <tr>
                  <td style="vertical-align: middle; padding-right: 12px;">
                    <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                      <span style="font-size: 24px; line-height: 48px; text-align: center; display: block; width: 48px;">🛡️</span>
                    </div>
                  </td>
                  <td style="vertical-align: middle;">
                    <span style="font-size: 28px; font-weight: bold; color: #ffffff;">
                      Zero<span style="color: #3b82f6;">To</span>VPN
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Card -->
          <tr>
            <td>
              <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);">

                <!-- Hero Section with Gradient -->
                <tr>
                  <td style="padding: 48px 40px 40px; text-align: center; background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #0ea5e9 100%);">
                    <div style="width: 80px; height: 80px; margin: 0 auto 24px; background: rgba(255, 255, 255, 0.15); border-radius: 50%; line-height: 80px;">
                      <span style="font-size: 40px;">🔒</span>
                    </div>
                    <h1 style="margin: 0 0 12px; color: #ffffff; font-size: 32px; font-weight: 800; letter-spacing: -0.5px;">
                      ${t.title}
                    </h1>
                    <p style="margin: 0; color: rgba(255, 255, 255, 0.85); font-size: 16px;">
                      ${t.greeting}
                    </p>
                  </td>
                </tr>

                <!-- Content Section -->
                <tr>
                  <td style="padding: 40px;">
                    <p style="margin: 0 0 28px; color: #374151; font-size: 16px; line-height: 1.7;">
                      ${t.thankYou}
                    </p>

                    <!-- What to Expect Box -->
                    <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-radius: 12px; padding: 24px; margin-bottom: 32px; border-left: 4px solid #3b82f6;">
                      <p style="margin: 0 0 16px; color: #1e40af; font-size: 16px; font-weight: 700;">
                        ${t.whatToExpect}
                      </p>
                      <table role="presentation" style="width: 100%; border-collapse: collapse;">
                        ${t.expectItems.map(item => `
                        <tr>
                          <td style="padding: 8px 0; vertical-align: top; width: 28px;">
                            <span style="color: #22c55e; font-size: 16px;">✓</span>
                          </td>
                          <td style="padding: 8px 0; color: #374151; font-size: 15px; line-height: 1.5;">
                            ${item}
                          </td>
                        </tr>
                        `).join('')}
                      </table>
                    </div>

                    <!-- CTA Button -->
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td align="center">
                          <a href="${dealsUrl}"
                             style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 700; border-radius: 10px; box-shadow: 0 4px 14px rgba(59, 130, 246, 0.4);">
                            ${t.cta} →
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Divider -->
                <tr>
                  <td style="padding: 0 40px;">
                    <div style="height: 1px; background: linear-gradient(to right, transparent, #e5e7eb, transparent);"></div>
                  </td>
                </tr>

                <!-- Footer inside card -->
                <tr>
                  <td style="padding: 32px 40px; text-align: center;">
                    <p style="margin: 0 0 8px; color: #1f2937; font-size: 15px; font-weight: 600;">
                      ${t.footer}
                    </p>
                    <p style="margin: 0; color: #9ca3af; font-size: 13px; line-height: 1.5;">
                      ${t.unsubscribe}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Bottom Footer -->
          <tr>
            <td style="padding: 32px 0; text-align: center;">
              <!-- Social Links -->
              <table role="presentation" style="margin: 0 auto 20px; border-collapse: collapse;">
                <tr>
                  <td style="padding: 0 8px;">
                    <a href="${baseUrl}" style="display: inline-block; width: 36px; height: 36px; background: rgba(255, 255, 255, 0.1); border-radius: 50%; line-height: 36px; text-align: center; text-decoration: none;">
                      <span style="color: #9ca3af; font-size: 14px;">🌐</span>
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin: 0 0 8px; color: #6b7280; font-size: 12px;">
                © ${new Date().getFullYear()} ZeroToAIAgents. All rights reserved.
              </p>
              <p style="margin: 0; color: #4b5563; font-size: 11px;">
                <a href="${baseUrl}" style="color: #60a5fa; text-decoration: none;">zerotoaiagents.com</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

// Get email subject by language
export function getWelcomeEmailSubject(language: string): string {
  return (welcomeEmailTranslations[language] || welcomeEmailTranslations.en).subject;
}

// Send notification when a blog post is published
export async function sendPostPublishedNotification({
  title,
  slug,
  category,
  excerpt,
}: {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
}) {
  const adminEmail = "marvinsmit1988@gmail.com";
  const postUrl = `https://zerotoaiagents.com/blog/${slug}`;

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background-color:#0f172a;">
  <table role="presentation" style="width:100%;border-collapse:collapse;background-color:#0f172a;">
    <tr><td align="center" style="padding:40px 20px;">
      <table role="presentation" style="max-width:600px;width:100%;border-collapse:collapse;">
        <tr><td align="center" style="padding:0 0 24px;">
          <span style="font-size:24px;font-weight:bold;color:#fff;">Zero<span style="color:#3b82f6;">To</span>VPN</span>
        </td></tr>
        <tr><td>
          <table role="presentation" style="width:100%;border-collapse:collapse;background:#fff;border-radius:12px;overflow:hidden;">
            <tr><td style="padding:32px 32px 0;text-align:center;background:linear-gradient(135deg,#22c55e,#16a34a);color:#fff;">
              <div style="font-size:40px;margin-bottom:12px;">&#9989;</div>
              <h1 style="margin:0 0 8px;font-size:22px;">New Blog Post Published</h1>
              <p style="margin:0 0 24px;opacity:0.9;font-size:14px;">Your pipeline just generated &amp; published a new post</p>
            </td></tr>
            <tr><td style="padding:32px;">
              <p style="margin:0 0 8px;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:1px;">${category}</p>
              <h2 style="margin:0 0 12px;color:#111;font-size:20px;">${title}</h2>
              <p style="margin:0 0 24px;color:#374151;font-size:14px;line-height:1.6;">${excerpt}</p>
              <table role="presentation" style="width:100%;"><tr><td align="center">
                <a href="${postUrl}" style="display:inline-block;padding:14px 32px;background:#3b82f6;color:#fff;text-decoration:none;font-weight:700;border-radius:8px;font-size:14px;">View Post &rarr;</a>
              </td></tr></table>
            </td></tr>
          </table>
        </td></tr>
        <tr><td style="padding:24px 0;text-align:center;">
          <p style="margin:0;color:#6b7280;font-size:11px;">&copy; ${new Date().getFullYear()} ZeroToAIAgents Pipeline</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`.trim();

  try {
    const { data, error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: adminEmail,
      subject: `[ZeroToAIAgents] New post published: ${title}`,
      html,
    });

    if (error) {
      console.error("Failed to send post notification:", error);
    }

    return data;
  } catch (err) {
    console.error("Post notification email error:", err);
  }
}

// Send welcome email
export async function sendWelcomeEmail({ email, language }: NewsletterWelcomeEmailProps) {
  const html = generateWelcomeEmailHtml({ email, language });
  const subject = getWelcomeEmailSubject(language);

  const { data, error } = await resend.emails.send({
    from: EMAIL_FROM,
    to: email,
    subject,
    html,
  });

  if (error) {
    console.error("Failed to send welcome email:", error);
    throw error;
  }

  return data;
}

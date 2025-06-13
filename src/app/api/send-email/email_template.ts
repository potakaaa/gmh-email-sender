export function createEmailHTML(
  name: string,
  email: string,
  topic: string,
  message: string
): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Message from ${name}</title>
    </head>
    <body style="margin:0;padding:0;font-family: 'Segoe UI', Arial, sans-serif;background:#fff;color:#222;line-height:1.6;">
      <div style="max-width:600px;margin:40px auto;background:#fff;border:1px solid #eee;border-radius:10px;overflow:hidden;">
        <!-- Header -->
        <div style="padding:32px 24px 16px 24px;text-align:center;border-bottom:1px solid #f0f0f0;">
          <h1 style="margin:0;font-size:24px;font-weight:600;letter-spacing:0.5px;">New Message Received</h1>
          <p style="margin:8px 0 0 0;font-size:15px;color:#888;">You have received a new inquiry</p>
        </div>

        <!-- Sender Info -->
        <div style="padding:24px 24px 0 24px;">
          <h2 style="margin:0 0 12px 0;font-size:16px;font-weight:600;color:#FFD700;letter-spacing:0.5px;">Sender Information</h2>
          <table style="width:100%;font-size:15px;margin-bottom:20px;">
            <tr>
              <td style="color:#888;padding:4px 0;width:80px;">Name</td>
              <td style="font-weight:500;color:#222;">${name}</td>
            </tr>
            <tr>
              <td style="color:#888;padding:4px 0;">Email</td>
              <td><a href="mailto:${email}" style="color:#FFD700;text-decoration:none;">${email}</a></td>
            </tr>
          </table>
        </div>

        <!-- Subject -->
        <div style="padding:0 24px 0 24px;">
          <div style="color:#888;font-size:13px;margin-bottom:2px;">Subject</div>
          <div style="font-size:16px;font-weight:500;padding:10px 0 18px 0;border-bottom:1px solid #f0f0f0;">${topic}</div>
        </div>

        <!-- Message -->
        <div style="padding:18px 24px 0 24px;">
          <div style="color:#888;font-size:13px;margin-bottom:2px;">Message</div>
          <div style="font-size:15px;padding:10px 0 18px 0;white-space:pre-wrap;border-bottom:1px solid #f0f0f0;">${message.replace(/\n/g, "<br>")}</div>
        </div>

        <!-- Reply Button -->
        <div style="text-align:center;padding:28px 24px 0 24px;">
          <a href="mailto:${email}?subject=Re: ${topic}"
             style="display:inline-block;background:#FFD700;color:#222;text-decoration:none;padding:12px 32px;border-radius:24px;font-weight:600;font-size:15px;letter-spacing:0.5px;transition:background 0.2s;">
            Reply to ${name}
          </a>
        </div>

        <!-- Footer -->
        <div style="padding:24px;text-align:center;font-size:12px;color:#aaa;border-top:1px solid #f0f0f0;margin-top:32px;">
          <div style="margin-bottom:4px;">This message was sent through your website contact form</div>
          <div style="color:#FFD700;">Delivered via Resend • ${new Date().toLocaleDateString(
            "en-US",
            {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }
          )}</div>
        </div>
      </div>
      <style>
        @media only screen and (max-width: 600px) {
          body { padding: 0 !important; }
          div[style*='max-width:600px'] { border-radius:0 !important; margin:0 !important; }
          div[style*='padding:24px'] { padding:16px !important; }
        }
      </style>
    </body>
    </html>
  `;
}

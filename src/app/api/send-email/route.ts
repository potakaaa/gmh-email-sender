import { Resend } from "resend";
import { NextRequest } from "next/dist/server/web/spec-extension/request";
import { NextResponse } from "next/server";
import { createEmailHTML } from "./email_template";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    // Log API key presence (not the actual key for security)
    console.log("API Key present:", !!process.env.RESEND_API_KEY);

    const { topic, message, name, email } = await request.json();
    console.log("Received request data:", { topic, name, email });

    // Validate required fields
    if (!topic || !message || !name || !email) {
      console.log("Missing required fields:", { topic, message, name, email });
      return NextResponse.json(
        { error: "Missing required fields: name, email, topic, message" },
        { status: 400 }
      );
    }

    // Check if recipient email is configured
    const recipientEmail = process.env.NEXT_PUBLIC_EMAIL_TO;
    console.log("Recipient email configured:", !!recipientEmail);
    if (!recipientEmail) {
      console.error("NEXT_PUBLIC_EMAIL_TO environment variable is not set");
      return NextResponse.json(
        { error: "Email configuration error" },
        { status: 500 }
      );
    }

    // Create the engaging HTML email
    const htmlContent = createEmailHTML(name, email, topic, message);

    // Send email using Resend
    console.log("Attempting to send email to:", recipientEmail);
    const data = await resend.emails.send({
      from: "gmh.monark-cat@grald.me",
      to: [recipientEmail],
      subject: `New Contact: ${topic}`,
      html: htmlContent,
      replyTo: email,
    });

    console.log("Email sent successfully:", data);
    return NextResponse.json(
      {
        message: "Email sent successfully",
        id: data.data?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);

    // More detailed error handling
    if (error instanceof Error) {
      console.error("Detailed error:", {
        message: error.message,
        stack: error.stack,
      });
      return NextResponse.json(
        { error: `Failed to send email: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}

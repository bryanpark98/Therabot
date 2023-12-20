import nodemailer from "nodemailer";
import logger from "../utils/logger";

export class EmailService {
  private static transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
      user: "notjohnnyroy@gmail.com", // your email
      pass: "sjnkgmelaydljrwe", // your email password
    },
  });

  public static async sendEmail(emailInfo: {
    to: string;
    subject: string;
    html: string;
  }): Promise<void> {
    const { to, subject, html } = emailInfo;
    const info = await EmailService.transporter.sendMail({
      from: "Your Journal Buddy <notjohnnyroy@gmail.com>",
      to: to,
      subject: subject,
      html: html,
    });
    logger.info(`Email sent to ${to} with message ID: ${info.messageId}`);
  }
}

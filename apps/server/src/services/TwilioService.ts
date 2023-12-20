import twilio from "twilio";

const accountSid = "AC63a112d6f17028a905134d1b5edc950c";
const authToken = "ead2b244c8420c4b29b56b48ad062294";

export class TwilioService {
  private static twilioClient = twilio(accountSid, authToken);

  public static async sendTextMessage(to: string, body: string): Promise<void> {
    await TwilioService.twilioClient.messages.create({
      body,
      from: "+18668051108",
      to,
    });
  }
}

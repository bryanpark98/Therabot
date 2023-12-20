import {
  RegisterNotionUserRequest,
  RegisterNotionUserResponse,
} from "@therabot/types";
import { EmailService, NotionService } from "../services";
import { MarkdownService } from "../services/MarkdownService";

export class NotionController {
  public static async registerUser(
    request: RegisterNotionUserRequest
  ): Promise<RegisterNotionUserResponse> {
    const { databaseUrl, emailAddress, introduction, oauthCode } = request;
    await NotionService.registerUser(
      databaseUrl,
      emailAddress,
      introduction,
      oauthCode
    );
    await EmailService.sendEmail({
      to: emailAddress,
      subject: "Thank You From Weekly Digest! 🎉",
      html: MarkdownService.formatMarkdownToHtml(
        "# Hooray! You're In! 🎉\n" +
          "Thanks for hopping on board the Journal Weekly Digest! 🚂 Every Friday evening, we'll pop into your inbox, shining a light on the top moments from your journaling week. 🌟✍️ \n Until then, keep penning those thoughts! 🌼📖\n\n" +
          ">🔍 Oh, and a nifty tidbit: Our Notion integration is super-flexible! No matter how your journal is formatted or if you decide to change up those database columns, we've got you covered. Feel free to craft your journals your way, and we'll take care of the rest. 🎈\n\n" +
          "Have a question or just want to chat? Reach out to me at <a href='mailto:johnnykaikane@gmail.com'>johnnykaikane@gmail.com</a>!\n"
      ),
    });
    return {};
  }
}

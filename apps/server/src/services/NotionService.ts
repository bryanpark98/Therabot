import { collectPaginatedAPI } from "@notionhq/client";
import { IEntry, IUser } from "@therabot/types";
import axios from "axios";
import { ApiError } from "../common/api_error";
import { UserModel } from "../models";
import config from "../utils/config";
import logger from "../utils/logger";

const { Client } = require("@notionhq/client");

export class NotionService {
  public static async getWeeklyJournalEntries({
    notionAccessToken,
    notionDatabaseId,
    startDate,
    endDate,
  }: {
    notionAccessToken: string;
    notionDatabaseId: string;
    startDate: Date;
    endDate: Date;
  }): Promise<IEntry[]> {
    const database = await NotionService.getNotionClient(
      notionAccessToken
    ).databases.query({
      database_id: notionDatabaseId,
      filter: {
        and: [
          {
            timestamp: "created_time",
            created_time: {
              after: startDate,
            },
          },
          {
            timestamp: "created_time",
            created_time: {
              before: endDate,
            },
          },
        ],
      },
    });

    const entries: IEntry[] = [];
    for (const page of database.results) {
      const pageId = page.id;
      const blocks = await collectPaginatedAPI(
        NotionService.getNotionClient(notionAccessToken).blocks.children.list,
        {
          block_id: pageId,
        } as any
      );
      entries.push({
        metadata: {
          "Created Time": page.created_time,
          ...NotionService.pagePropertiesToMetadata(page.properties),
        },
        text: blocks
          .map((block) => NotionService.blockToPlainText(block))
          .join("\n")
          .trim(),
      });
    }
    return entries;
  }

  private static getNotionClient(accessToken: string) {
    return new Client({
      auth: accessToken,
    });
  }

  private static pagePropertiesToMetadata(properties: any): {
    [key: string]: string;
  } {
    const metadata: { [key: string]: string } = {};

    for (const [key, propNoCast] of Object.entries(properties)) {
      const prop: any = propNoCast as any;
      switch ((prop as any).type) {
        case "title":
          metadata[key] = prop.title.map((t: any) => t.plain_text).join("");
          break;

        case "rich_text":
          metadata[key] = prop.rich_text.map((t: any) => t.plain_text).join("");
          break;

        case "number":
          metadata[key] = prop.number;
          break;

        case "select":
          metadata[key] = prop.select.name;
          break;

        case "multi_select":
          metadata[key] = prop.multi_select.map((s: any) => s.name).join(", ");
          break;

        case "date":
          metadata[key] = `${prop.date.start}${
            prop.date.end ? ` - ${prop.date.end}` : ""
          }`;
          break;

        case "checkbox":
          metadata[key] = prop.checkbox ? "Yes" : "No";
          break;

        default:
          break;
      }
    }

    return metadata;
  }

  private static blockToPlainText = (block: any): string => {
    let text = "";

    switch (block.type) {
      case "paragraph":
        text +=
          block.paragraph.rich_text.map((t: any) => t.plain_text).join("") +
          "\n";
        break;

      case "heading_1":
      case "heading_2":
      case "heading_3":
        text +=
          "#".repeat(parseInt(block.type.split("_")[1])) +
          " " +
          block[block.type].rich_text.map((t: any) => t.plain_text).join("") +
          "\n";
        break;

      case "bulleted_list_item":
      case "numbered_list_item":
        text +=
          "- " +
          block[block.type].rich_text.map((t: any) => t.plain_text).join("") +
          "\n";
        break;

      case "to_do":
        text +=
          "TODO " +
          (block.to_do.checked ? "[x] : " : "[ ] : ") +
          block.to_do.rich_text.map((t: any) => t.plain_text).join("") +
          "\n";
        break;

      // Add more block types as needed, or handle them differently depending on your use-case

      default:
        // Optional: log unhandled block types for future consideration
        // console.warn('Unhandled block type:', block.type);
        break;
    }
    return text.trim();
  };

  private static extractIdFromNotionUrl = (url: string): string => {
    const regex = /\/([a-fA-F0-9]{32})\?/; // Matches a 32-character hex string between the last slash and the question mark
    const match = url.match(regex);
    if (!match) throw new ApiError("Invalid Notion URL", 400);
    return match[1];
  };

  public static async registerUser(
    notionDatabaseUrl: string,
    emailAddress: string,
    introduction: string,
    oauthCode: string
  ): Promise<IUser> {
    const token = await NotionService.getAccessToken(oauthCode);

    const databaseId = NotionService.extractIdFromNotionUrl(notionDatabaseUrl);
    const user = (await UserModel.findOne({ emailAddress })) || new UserModel();

    // Just update the user if it already exists
    user.notionDatabaseId = databaseId;
    user.emailAddress = emailAddress;
    user.introduction = introduction;
    user.notionAccessToken = token;
    await user.save();

    logger.info("Created user", user.toObject());
    return user.toObject();
  }

  public static async getAccessToken(code: string): Promise<string> {
    try {
      const encoded = Buffer.from(
        `${config.notionClientId}:${config.notionClientSecret}`
      ).toString("base64");
      const { data } = await axios.post(
        "https://api.notion.com/v1/oauth/token",
        {
          grant_type: "authorization_code",
          code: code,
          redirect_uri: config.notionRedirectUrl,
        },
        {
          headers: {
            Authorization: `Basic ${encoded}`,
            "Content-Type": "application/json",
          },
        }
      );
      logger.info("Got Notion access token", data);
      return data.access_token;
    } catch (e) {
      throw new ApiError("Invalid OAuth code", 400);
    }
  }
}

import { IUser } from "@therabot/types";
export declare class NotionService {
    private static notionClient;
    private static pagePropertiesToPlainText;
    private static blockToPlainText;
    private static extractIdFromNotionUrl;
    static registerUser(notionDatabaseUrl: string, emailAddress: string, introduction: string): Promise<IUser>;
    static readAllUsers(): Promise<IUser[]>;
    static createWeeklyDigest(databaseId: string): Promise<string>;
}
//# sourceMappingURL=NotionService.d.ts.map
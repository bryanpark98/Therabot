import { IDigest, IUser } from "@therabot/types";
import { Types } from "mongoose";
import { DigestModel, fromDigestDocument } from "../models/DigestModel";
import config from "../utils/config";
import { NotionService } from "./NotionService";
import { OpenAiService } from "./OpenAiService";
import { ViewRendererService } from "./ViewRendererService";

export class DigestService {
  /**
   * Creates a weekly digest for a user and writes to storage
   * @param user The user to create a digest for
   * @param previousDigest The previous digest to use as a base if there is one
   * @param idToOverwrite The ID of the digest to overwrite if regenerating
   */
  public static async createWeeklyDigest({
    user,
    previousDigest,
    idToOverwrite,
    startDate,
    endDate,
  }: {
    user: IUser;
    previousDigest?: IDigest;
    idToOverwrite?: string;
    startDate: Date;
    endDate: Date;
  }): Promise<IDigest | null> {
    const { notionDatabaseId, notionAccessToken, introduction } = user;
    const { notes } = previousDigest || {};

    if (!notionDatabaseId || !notionAccessToken) return null;

    const entries = await NotionService.getWeeklyJournalEntries({
      notionAccessToken,
      notionDatabaseId,
      startDate,
      endDate,
    });

    if (!entries.length) return null;

    const digestInfo = await OpenAiService.getWeeklyDigest(
      entries,
      introduction || "No introduction given",
      notes || "No progress notes given"
    );

    if (!digestInfo) return null;

    if (idToOverwrite) {
      await DigestModel.findByIdAndDelete(new Types.ObjectId(idToOverwrite));
    }

    const digestId = new Types.ObjectId();
    const digest = new DigestModel();
    digest._id = digestId;
    digest.type = "WEEKLY";
    digest.notes = digestInfo.notes;
    digest.html = await ViewRendererService.render("emails/weekly_digest", {
      ...digestInfo.content,
      baseUrl: config.baseUrl,
      digestId: digestId.toHexString(),
    });
    digest.startDate = startDate;
    digest.endDate = endDate;
    digest.userObjectId = new Types.ObjectId(user.id);
    await digest.save();

    return fromDigestDocument(digest);
  }

  public static async getDigests({
    userId,
    endDate,
    startDate,
    limit,
  }: {
    userId?: string;
    endDate?: Date;
    startDate?: Date;
    limit?: number;
  }) {
    const query: any = {};
    if (userId) query.userObjectId = new Types.ObjectId(userId);
    if (endDate) query.endDate = endDate;
    if (startDate) query.startDate = startDate;

    let queryBuilder = DigestModel.find(query);

    // Sort to allow for pagination
    queryBuilder = queryBuilder.sort({ createdDate: -1 });
    if (limit !== undefined) queryBuilder = queryBuilder.limit(limit);

    return (await queryBuilder).map(fromDigestDocument);
  }

  public static async getDigest({
    userId,
    endDate,
    startDate,
  }: {
    userId: string;
    endDate?: Date;
    startDate?: Date;
  }): Promise<IDigest | null> {
    return (
      (await this.getDigests({
        userId,
        endDate,
        startDate,
        limit: 1,
      }).then((digests) => digests[0])) || null
    );
  }

  public static async markDigestAsSent(digestId: string): Promise<void> {
    await DigestModel.findByIdAndUpdate(
      new Types.ObjectId(digestId),
      { sentEmail: true },
      { useFindAndModify: false }
    );
  }
}

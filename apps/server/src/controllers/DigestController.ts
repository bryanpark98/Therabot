import {
  CompileWeeklyDigestsRequest,
  CompileWeeklyDigestsResponse,
  IDigest,
  SendWeeklyDigestsRequest,
  SendWeeklyDigestsResponse,
} from "@therabot/types";
import { EmailService } from "../services";
import { DigestService } from "../services/DigestService";
import { UserService } from "../services/UserService";
import logger from "../utils/logger";

export class DigestController {
  public static async compileWeeklyDigests(
    request: CompileWeeklyDigestsRequest
  ): Promise<CompileWeeklyDigestsResponse> {
    let { regenerate } = request;

    const startDate = new Date(request.startDate);
    const endDate = new Date(request.endDate);

    const users = request.emailAddresses
      ? await UserService.getUsersByEmailAddress(request.emailAddresses)
      : await UserService.readAllUsers();

    let digestsCreated = 0;
    let digestsOverwritten = 0;
    await Promise.all(
      users.map(async (user) => {
        const { notionDatabaseId, introduction } = user;
        if (!notionDatabaseId || !introduction) return;

        const currentDigest = await DigestService.getDigest({
          userId: user.id,
          startDate,
          endDate,
        });

        const previousDigest = await DigestService.getDigest({
          userId: user.id,
          endDate: startDate,
        });

        // If we already have a digest for this week, don't create another one unless regenerate is true
        if (!regenerate && currentDigest) {
          logger.info(`Already sent digest for ${user.emailAddress}`);
          return;
        }

        await DigestService.createWeeklyDigest({
          user,
          previousDigest: previousDigest || undefined,
          idToOverwrite: currentDigest?.id,
          startDate,
          endDate,
        });

        digestsCreated++;
        if (currentDigest) digestsOverwritten++;
      })
    );
    return { digestsCreated, digestsOverwritten };
  }

  public static async sendWeeklyDigests(
    request: SendWeeklyDigestsRequest
  ): Promise<SendWeeklyDigestsResponse> {
    // TODO: paginate this request (definitely cant store all digests in memory )
    const { emailAddresses } = request;
    const startDate = new Date(request.startDate);
    const endDate = new Date(request.endDate);

    let thisWeeksDigests: IDigest[];

    // Only used for testing
    if (emailAddresses) {
      const users = await UserService.getUsersByEmailAddress(emailAddresses);
      thisWeeksDigests = (
        await Promise.all(
          users.map(async (user) => {
            return await DigestService.getDigest({
              userId: user.id,
              startDate,
              endDate,
            });
          })
        )
      ).filter((digest): digest is IDigest => digest !== null);
    } else {
      thisWeeksDigests = await DigestService.getDigests({
        endDate,
        startDate,
        limit: 1000,
      });
    }

    let digestsSent = 0;
    await Promise.all(
      thisWeeksDigests.map(async (digest) => {
        const user = await UserService.getUserById(digest.userId);
        if (!user) return;
        await EmailService.sendEmail({
          to: user.emailAddress,
          subject: "Journal Weekly Digest",
          html: digest.html,
        });
        digestsSent++;
        await DigestService.markDigestAsSent(digest.id);
      })
    );
    return { digestsSent };
  }

  private static getStartOfWeek(weeksAgo: number = 0): Date {
    const currentDate = new Date();

    // Calculate the start of the current week (Sunday)
    const startOfWeek = new Date(currentDate);
    startOfWeek.setHours(0, 0, 0, 0);
    startOfWeek.setDate(
      currentDate.getDate() - currentDate.getDay() - weeksAgo * 7
    );

    return startOfWeek;
  }
}

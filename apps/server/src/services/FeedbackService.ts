import { IFeedback } from "@therabot/types";
import { Types } from "mongoose";
import { FeedbackModel } from "../models/FeedbackModel";

export class FeedbackService {
  public static async createFeedback(
    digestId: string,
    text: string
  ): Promise<IFeedback> {
    const feedback = new FeedbackModel();
    feedback.text = text;
    feedback.digestObjectId = new Types.ObjectId(digestId);
    await feedback.save();
    return feedback.toObject();
  }
}

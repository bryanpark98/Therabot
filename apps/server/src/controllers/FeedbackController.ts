import { CreateFeedbackRequest, CreateFeedbackResponse } from "@therabot/types";
import { FeedbackService } from "../services/FeedbackService";

export class FeedbackController {
  public static async createFeedback(
    request: CreateFeedbackRequest
  ): Promise<CreateFeedbackResponse> {
    return await FeedbackService.createFeedback(request.digestId, request.text);
  }
}

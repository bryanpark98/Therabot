import { IFeedback } from "@therabot/types";
import mongoose, { Document, Model, Schema, Types } from "mongoose";

interface FeedbackDocument
  extends Omit<IFeedback, "digestId" | "id">,
    Document {
  digestObjectId: Types.ObjectId;
}

const FeedbackSchema = new Schema<FeedbackDocument>({
  createdDate: { type: Date, required: true, default: Date.now },
  text: { type: String, required: true },
  digestObjectId: {
    type: Schema.Types.ObjectId,
    ref: "Digest",
    required: true,
  },
});

export const FeedbackModel: Model<FeedbackDocument> =
  mongoose.model<FeedbackDocument>("Feedback", FeedbackSchema);

export const fromFeedbackDocument = (doc: FeedbackDocument): IFeedback => {
  return {
    ...doc.toObject(),
    id: doc._id.toHexString(),
    digestId: doc.digestObjectId.toHexString(),
  };
};

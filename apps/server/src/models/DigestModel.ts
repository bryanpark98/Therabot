import { IDigest } from "@therabot/types";
import mongoose, { Document, Model, Schema, Types } from "mongoose";

interface DigestDocument extends Omit<IDigest, "userId" | "id">, Document {
  userObjectId: Types.ObjectId;
}

const DigestSchema = new Schema<DigestDocument>({
  type: { type: String, required: true },
  userObjectId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  html: { type: String, required: true },
  sentEmail: { type: Boolean, required: true, default: false },
  notes: { type: String, required: false },
  startDate: { type: Date, required: false },
  endDate: { type: Date, required: false },
  createdDate: { type: Date, required: true, default: Date.now },
});

export const DigestModel: Model<DigestDocument> =
  mongoose.model<DigestDocument>("Digest", DigestSchema);

// Convert DigestDocument format to IDigest after fetching
export const fromDigestDocument = (doc: DigestDocument): IDigest => {
  return {
    ...doc.toObject(),
    id: doc._id.toHexString(),
    userId: doc.userObjectId.toHexString(),
  };
};

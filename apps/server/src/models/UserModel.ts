import { IUser } from "@therabot/types";
import mongoose, { Document, Schema } from "mongoose";
import { setupVirtualId } from "./utils";

const UserSchema: Schema<IUser & Document> = new Schema({
  emailAddress: { type: String, required: false, unique: true },
  notionDatabaseId: { type: String, required: false },
  notionAccessToken: { type: String, required: false },
  phoneNumber: { type: String, required: false },
  introduction: { type: String, required: false },
});

setupVirtualId(UserSchema);

export const UserModel = mongoose.model<IUser & Document>("User", UserSchema);

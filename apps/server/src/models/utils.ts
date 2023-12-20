import { Schema, Document } from "mongoose";

export function setupVirtualId<T>(schema: Schema<T>): void {
  // Set up a virtual for 'id'
  schema.virtual("id").get(function (this: Document) {
    return this._id.toHexString();
  });

  // Ensure virtual fields are serialized and remove _id
  schema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      delete ret._id;
    },
  });
}

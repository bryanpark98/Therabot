import { IUser } from "@therabot/types";
import { Types } from "mongoose";
import { UserModel } from "../models";

export class UserService {
  public static async readAllUsers(): Promise<IUser[]> {
    return UserModel.find({});
  }

  public static async getUserByEmailAddress(
    emailAddress: string
  ): Promise<IUser | null> {
    const user = await UserModel.findOne({ emailAddress });
    if (!user) return null;
    return user.toJSON();
  }

  public static async getUsersByEmailAddress(
    emailAddresses: string[]
  ): Promise<IUser[]> {
    return (
      await UserModel.find({ emailAddress: { $in: emailAddresses } })
    ).map((user) => user.toJSON());
  }

  public static async getUserById(id: string): Promise<IUser | null> {
    const user = await UserModel.findById(new Types.ObjectId(id));
    if (!user) return null;
    return user.toJSON();
  }
}

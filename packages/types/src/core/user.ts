export interface IUser {
  id: string;
  emailAddress: string;
  notionDatabaseId?: string;
  notionAccessToken?: string;
  phoneNumber?: string;
  introduction?: string;
}

export interface IDigest {
    id: string;
    type: "WEEKLY" | "MONTHLY";
    userId: string;
    html: string;
    sentEmail: boolean;
    notes: string;
    startDate: Date;
    endDate: Date;
    createdDate: Date;
}
//# sourceMappingURL=digest.d.ts.map
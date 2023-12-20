export type CompileWeeklyDigestsRequest = {
    regenerate: boolean;
    emailAddresses?: string[];
    startDate: string;
    endDate: string;
};
export type CompileWeeklyDigestsResponse = {
    digestsCreated: number;
    digestsOverwritten: number;
};
export type SendWeeklyDigestsRequest = {
    emailAddresses?: string[];
    startDate: string;
    endDate: string;
};
export type SendWeeklyDigestsResponse = {
    digestsSent: number;
};
//# sourceMappingURL=digest.d.ts.map
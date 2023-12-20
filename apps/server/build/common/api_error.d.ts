export declare class ApiError extends Error {
    message: string;
    errors: string | string[];
    statusCode: number;
    constructor(message: string, statusCode?: number, errors?: string | string[]);
}
//# sourceMappingURL=api_error.d.ts.map
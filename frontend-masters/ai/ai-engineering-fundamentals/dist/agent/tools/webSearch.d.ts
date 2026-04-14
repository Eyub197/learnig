export declare const webSearch: import("ai").Tool<{}, {
    action: {
        type: "search";
        query?: string;
    } | {
        type: "openPage";
        url: string;
    } | {
        type: "find";
        url: string;
        pattern: string;
    };
    sources?: Array<{
        type: "url";
        url: string;
    } | {
        type: "api";
        name: string;
    }>;
}>;

export declare const readFile: import("ai").Tool<{
    path: string;
}, string>;
export declare const writeFile: import("ai").Tool<{
    path: string;
    content: string;
}, string>;
export declare const listFiles: import("ai").Tool<{
    directory: string;
}, string>;
export declare const deleteFile: import("ai").Tool<{
    path: string;
}, string>;

/** vite插件类型 */
export type VitePluginsType = {
    name: string;
    apply: "build";
    closeBundle: () => void;
};
export type SourceMapUploaderType = {
    uploadURL: string;
    enable?: boolean;
};
/** 数据上报主类 options 参数 */
export type ErrorReportType = {
    reportApi: string;
    vue: object;
    module: string;
};
export interface ApiResponse {
    code: number;
    data: {
        msg?: string;
    };
}

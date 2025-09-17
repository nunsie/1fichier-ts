import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import type {
    DownloadTokenResponse,
    UploadServerResponse,
    UploadResult,
    FileListResponse,
    FileInfo,
    ScanFileResponse,
    RemoveFilesResponse,
    MoveFilesResponse,
    RenameFilesResponse,
    CopyFilesResponse,
    ChangeAttrResponse,
    FolderInfo,
    CreateFolderResponse,
    ShareFolderResponse,
    MoveFolderResponse,
    RemoveFolderResponse,
    UserInfoResponse,
    RemoteUploadListResponse,
    RemoteUploadInfoResponse,
    RemoteUploadRequestResponse,
    VoucherListResponse,
    VoucherCheckResponse,
    VoucherUseResponse,
} from "./types.js";

/**
 * 1fichier.com API Client
 *
 * Implements all endpoints from the official OpenAPI spec.
 * Authentication: Bearer API Key in Authorization header.
 *
 * @see https://1fichier.com/api.html
 */
export default class FichierApiClient {
    private axios: AxiosInstance;

    /**
     * @param apiKey Your 1fichier.com API key
     * @param baseURL API base URL (default: https://api.1fichier.com/v1)
     */
    constructor(apiKey: string, baseURL = "https://api.1fichier.com/v1") {
        this.axios = axios.create({
            baseURL,
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
        });
    }

    /**
     * Generate download token
     * @param data Request body
     */
    async getDownloadToken(data: {
        url: string;
        inline?: number;
        cdn?: number;
        restrict_ip?: number;
        single?: number;
        pass?: string;
        no_ssl?: number;
        folder_id?: number;
        filename?: string;
        sharing_user?: string;
    }): Promise<DownloadTokenResponse> {
        const res = await this.axios.post("/download/get_token.cgi", data);
        return res.data;
    }

    /**
     * Get upload server node
     * @param pretty Set to 1 for pretty-printed JSON output
     */
    async getUploadServer(pretty?: number): Promise<UploadServerResponse> {
        const res = await this.axios.post("/upload/get_upload_server.cgi", {
            pretty,
        });
        return res.data;
    }

    /**
     * Upload files (multipart/form-data)
     * @param id Emission ID from getUploadServer
     * @param formData FormData containing files and fields
     * @param config Optional Axios config
     */
    async uploadFiles(
        id: string,
        formData: FormData,
        config?: AxiosRequestConfig
    ): Promise<UploadResult | void> {
        // For Node.js, use form-data package for getHeaders, otherwise skip
        let authHeader = this.axios.defaults.headers["Authorization"];
        if (typeof authHeader !== "string") {
            authHeader = String(authHeader ?? "");
        }
        let headers: Record<string, string> = {
            Authorization: authHeader,
        };
        // @ts-ignore
        if (typeof (formData as any).getHeaders === "function") {
            // @ts-ignore
            headers = { ...headers, ...(formData as any).getHeaders() };
        }
        const res = await this.axios.post(`/upload.cgi?id=${id}`, formData, {
            ...config,
            headers,
        });
        // May redirect (302) or return 200
        return res.data;
    }

    /**
     * Get upload result
     * @param xid Temporary unique identifier of upload
     * @param exportCsv Set to 1 for CSV export
     * @param json Set to 1 for JSON, 2 for pretty JSON
     */
    async getUploadResult(
        xid: string,
        exportCsv?: number,
        json?: number
    ): Promise<UploadResult> {
        const params = new URLSearchParams();
        params.append("xid", xid);
        if (exportCsv) params.append("Export", exportCsv.toString());
        if (json) params.append("JSON", json.toString());
        const res = await this.axios.get(`/end.pl?${params.toString()}`);
        return res.data;
    }

    /**
     * List files in folder
     * @param data Request body
     */
    async listFiles(data: {
        folder_id?: number;
        sharing_user?: string;
        sent_before?: string;
        sent_after?: string;
    }): Promise<FileListResponse> {
        const res = await this.axios.post("/file/ls.cgi", data);
        return res.data;
    }

    /**
     * Get file information
     * @param data Request body
     */
    async getFileInfo(data: {
        url: string;
        pass?: string;
        folder_id?: number;
        filename?: string;
        sharing_user?: string;
    }): Promise<FileInfo> {
        const res = await this.axios.post("/file/info.cgi", data);
        return res.data;
    }

    /**
     * Scan file for viruses
     * @param url Download link to scan
     */
    async scanFile(url: string): Promise<ScanFileResponse> {
        const res = await this.axios.post("/file/scan.cgi", { url });
        return res.data;
    }

    /**
     * Remove files
     * @param files Array of files to remove
     */
    async removeFiles(
        files: Array<{ url: string; code?: string }>
    ): Promise<RemoveFilesResponse> {
        const res = await this.axios.post("/file/rm.cgi", { files });
        return res.data;
    }

    /**
     * Move files
     * @param data Request body
     */
    async moveFiles(data: {
        urls: string[];
        destination_folder_id: number;
        destination_user?: string;
        rename?: string;
    }): Promise<MoveFilesResponse> {
        const res = await this.axios.post("/file/mv.cgi", data);
        return res.data;
    }

    /**
     * Rename files
     * @param urls Array of { url, filename }
     * @param pretty Set to 1 for pretty-printed JSON output
     */
    async renameFiles(
        urls: Array<{ url: string; filename: string }>,
        pretty?: number
    ): Promise<RenameFilesResponse> {
        const res = await this.axios.post("/file/rename.cgi", { urls, pretty });
        return res.data;
    }

    /**
     * Copy files
     * @param data Request body
     */
    async copyFiles(data: {
        urls: string[];
        folder_id?: number;
        pass?: string;
        sharing_user?: string;
        rename?: string;
    }): Promise<CopyFilesResponse> {
        const res = await this.axios.post("/file/cp.cgi", data);
        return res.data;
    }

    /**
     * Change file attributes
     * @param data Request body
     */
    async changeFileAttributes(data: {
        urls: string[];
        filename?: string;
        description?: string;
        pass?: string;
        no_ssl?: number;
        inline?: number;
        cdn?: number;
        acl?: {
            ip?: string[];
            country?: string[];
            email?: string[];
            premium?: number;
        };
    }): Promise<ChangeAttrResponse> {
        const res = await this.axios.post("/file/chattr.cgi", data);
        return res.data;
    }

    /**
     * List folders
     * @param data Request body
     */
    async listFolders(data: {
        folder_id?: number;
        sharing_user?: string;
        files?: number;
    }): Promise<FolderInfo> {
        const res = await this.axios.post("/folder/ls.cgi", data);
        return res.data;
    }

    /**
     * Create folder
     * @param data Request body
     */
    async createFolder(data: {
        name: string;
        folder_id?: number;
        sharing_user?: string;
    }): Promise<CreateFolderResponse> {
        const res = await this.axios.post("/folder/mkdir.cgi", data);
        return res.data;
    }

    /**
     * Share folder
     * @param data Request body
     */
    async shareFolder(data: {
        folder_id: number;
        share?: number;
        pass?: string;
        shares?: Array<{ email: string; rw: number; hide_links: number }>;
    }): Promise<ShareFolderResponse> {
        const res = await this.axios.post("/folder/share.cgi", data);
        return res.data;
    }

    /**
     * Move folder
     * @param data Request body
     */
    async moveFolder(data: {
        folder_id: number;
        destination_folder_id: number;
        destination_user?: string;
        rename?: string;
    }): Promise<MoveFolderResponse> {
        const res = await this.axios.post("/folder/mv.cgi", data);
        return res.data;
    }

    /**
     * Remove folder
     * @param folder_id Folder ID to remove
     */
    async removeFolder(folder_id: number): Promise<RemoveFolderResponse> {
        const res = await this.axios.post("/folder/rm.cgi", { folder_id });
        return res.data;
    }

    /**
     * Get or set account info
     * @param data Request body
     */
    async getUserInfo(data?: {
        ftp_mode?: number;
        ftp_did?: number;
        ftp_report?: number;
        ru_report?: number;
        default_domain?: number;
        page_limit?: number;
        default_port?: number;
        default_port_files?: number;
        use_cdn?: number;
        download_menu?: number;
    }): Promise<UserInfoResponse> {
        const res = await this.axios.post("/user/info.cgi", data ?? {});
        return res.data;
    }

    /**
     * List remote uploads
     */
    async listRemoteUploads(): Promise<RemoteUploadListResponse> {
        const res = await this.axios.post("/remote/ls.cgi");
        return res.data;
    }

    /**
     * Get remote upload info
     * @param id Remote upload request ID
     */
    async getRemoteUploadInfo(id: string): Promise<RemoteUploadInfoResponse> {
        const res = await this.axios.post("/remote/info.cgi", { id });
        return res.data;
    }

    /**
     * Request remote upload
     * @param data Request body
     */
    async requestRemoteUpload(data: {
        urls: string[];
        folder_id?: number;
        headers?: Record<string, string>;
    }): Promise<RemoteUploadRequestResponse> {
        const res = await this.axios.post("/remote/request.cgi", data);
        return res.data;
    }

    /**
     * List unused vouchers
     */
    async listVouchers(): Promise<VoucherListResponse> {
        const res = await this.axios.post("/vouchers/ls.cgi");
        return res.data;
    }

    /**
     * Check voucher validity
     * @param voucher Voucher code
     */
    async checkVoucher(voucher: string): Promise<VoucherCheckResponse> {
        const res = await this.axios.post("/vouchers/check.cgi", { voucher });
        return res.data;
    }

    /**
     * Use voucher
     * @param voucher Voucher code
     * @param user_email User email
     */
    async useVoucher(
        voucher: string,
        user_email: string
    ): Promise<VoucherUseResponse> {
        const res = await this.axios.post("/vouchers/use.cgi", {
            voucher,
            user_email,
        });
        return res.data;
    }
}

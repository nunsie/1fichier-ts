import { describe, it, expect, vi, beforeEach } from "vitest";
import FichierApiClient from "./index.js";

// Replace with a valid API key for real integration tests
const API_KEY = process.env.FICHIER_API_KEY || "test_api_key";

describe("FichierApiClient Unit", () => {
    let client: FichierApiClient;
    let mockAxios: any;
    beforeEach(() => {
        client = new FichierApiClient(API_KEY);
        mockAxios = client["axios"];
        vi.spyOn(mockAxios, "post").mockResolvedValue({ data: {} });
        vi.spyOn(mockAxios, "get").mockResolvedValue({ data: {} });
    });

    it("calls getDownloadToken with correct args", async () => {
        await client.getDownloadToken({ url: "test" });
        expect(mockAxios.post).toHaveBeenCalledWith("/download/get_token.cgi", {
            url: "test",
        });
    });

    it("calls getUploadServer with correct args", async () => {
        await client.getUploadServer(1);
        expect(mockAxios.post).toHaveBeenCalledWith(
            "/upload/get_upload_server.cgi",
            { pretty: 1 }
        );
    });

    it("calls uploadFiles with correct args", async () => {
        const formData = {
            append: vi.fn(),
            delete: vi.fn(),
            get: vi.fn(),
            getAll: vi.fn(),
            has: vi.fn(),
            set: vi.fn(),
            forEach: vi.fn(),
            entries: vi.fn(),
            keys: vi.fn(),
            values: vi.fn(),
            [Symbol.iterator]: vi.fn(),
        } as unknown as FormData;
        await client.uploadFiles("id", formData);
        expect(mockAxios.post).toHaveBeenCalled();
    });

    it("calls getUploadResult with correct args", async () => {
        await client.getUploadResult("xid");
        expect(mockAxios.get).toHaveBeenCalled();
    });

    it("calls listFiles with correct args", async () => {
        await client.listFiles({});
        expect(mockAxios.post).toHaveBeenCalledWith("/file/ls.cgi", {});
    });

    it("calls getFileInfo with correct args", async () => {
        await client.getFileInfo({ url: "test" });
        expect(mockAxios.post).toHaveBeenCalledWith("/file/info.cgi", {
            url: "test",
        });
    });

    it("calls scanFile with correct args", async () => {
        await client.scanFile("test");
        expect(mockAxios.post).toHaveBeenCalledWith("/file/scan.cgi", {
            url: "test",
        });
    });

    it("calls removeFiles with correct args", async () => {
        await client.removeFiles([{ url: "test" }]);
        expect(mockAxios.post).toHaveBeenCalledWith("/file/rm.cgi", {
            files: [{ url: "test" }],
        });
    });

    it("calls moveFiles with correct args", async () => {
        await client.moveFiles({ urls: ["test"], destination_folder_id: 1 });
        expect(mockAxios.post).toHaveBeenCalledWith("/file/mv.cgi", {
            urls: ["test"],
            destination_folder_id: 1,
        });
    });

    it("calls renameFiles with correct args", async () => {
        await client.renameFiles([{ url: "test", filename: "file" }], 1);
        expect(mockAxios.post).toHaveBeenCalledWith("/file/rename.cgi", {
            urls: [{ url: "test", filename: "file" }],
            pretty: 1,
        });
    });

    it("calls copyFiles with correct args", async () => {
        await client.copyFiles({ urls: ["test"] });
        expect(mockAxios.post).toHaveBeenCalledWith("/file/cp.cgi", {
            urls: ["test"],
        });
    });

    it("calls changeFileAttributes with correct args", async () => {
        await client.changeFileAttributes({ urls: ["test"] });
        expect(mockAxios.post).toHaveBeenCalledWith("/file/chattr.cgi", {
            urls: ["test"],
        });
    });

    it("calls listFolders with correct args", async () => {
        await client.listFolders({});
        expect(mockAxios.post).toHaveBeenCalledWith("/folder/ls.cgi", {});
    });

    it("calls createFolder with correct args", async () => {
        await client.createFolder({ name: "folder" });
        expect(mockAxios.post).toHaveBeenCalledWith("/folder/mkdir.cgi", {
            name: "folder",
        });
    });

    it("calls shareFolder with correct args", async () => {
        await client.shareFolder({ folder_id: 1 });
        expect(mockAxios.post).toHaveBeenCalledWith("/folder/share.cgi", {
            folder_id: 1,
        });
    });

    it("calls moveFolder with correct args", async () => {
        await client.moveFolder({ folder_id: 1, destination_folder_id: 2 });
        expect(mockAxios.post).toHaveBeenCalledWith("/folder/mv.cgi", {
            folder_id: 1,
            destination_folder_id: 2,
        });
    });

    it("calls removeFolder with correct args", async () => {
        await client.removeFolder(1);
        expect(mockAxios.post).toHaveBeenCalledWith("/folder/rm.cgi", {
            folder_id: 1,
        });
    });

    it("calls getUserInfo with correct args", async () => {
        await client.getUserInfo();
        expect(mockAxios.post).toHaveBeenCalledWith("/user/info.cgi", {});
    });

    it("calls listRemoteUploads", async () => {
        await client.listRemoteUploads();
        expect(mockAxios.post).toHaveBeenCalledWith("/remote/ls.cgi");
    });

    it("calls getRemoteUploadInfo with correct args", async () => {
        await client.getRemoteUploadInfo("id");
        expect(mockAxios.post).toHaveBeenCalledWith("/remote/info.cgi", {
            id: "id",
        });
    });

    it("calls requestRemoteUpload with correct args", async () => {
        await client.requestRemoteUpload({ urls: ["test"] });
        expect(mockAxios.post).toHaveBeenCalledWith("/remote/request.cgi", {
            urls: ["test"],
        });
    });

    it("calls listVouchers", async () => {
        await client.listVouchers();
        expect(mockAxios.post).toHaveBeenCalledWith("/vouchers/ls.cgi");
    });

    it("calls checkVoucher with correct args", async () => {
        await client.checkVoucher("voucher");
        expect(mockAxios.post).toHaveBeenCalledWith("/vouchers/check.cgi", {
            voucher: "voucher",
        });
    });

    it("calls useVoucher with correct args", async () => {
        await client.useVoucher("voucher", "email@test.com");
        expect(mockAxios.post).toHaveBeenCalledWith("/vouchers/use.cgi", {
            voucher: "voucher",
            user_email: "email@test.com",
        });
    });
});

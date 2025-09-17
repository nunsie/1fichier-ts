/**
 * 1fichier.com API Schemas
 */
export interface FileInfo {
	url: string;
	filename: string;
	size: number;
	date: string;
	folder_id: number;
	path: string;
	checksum: string;
	content_type: string;
	description: string;
	pass: number;
	no_ssl: number;
	inline: number;
	cdn: number;
	acl: {
		ip?: string[];
		country?: string[];
		email?: string[];
		premium?: number;
	};
}

export interface FileListItem {
	url: string;
	filename: string;
	size: number;
	date: string;
	checksum: string;
	'content-type': string;
	pass: number;
	acl: number;
	cdn: number;
}

export interface FolderInfo {
	folder_id: number;
	name: string;
	create_date: string;
	shared: string;
	pass: number;
	shares: Array<{
		email: string;
		rw: number;
		hide_links: number;
	}>;
	user: string;
	rw: number;
	hide_links: number;
	files: number;
	size: number;
	sub_folders: FolderInfo[];
	items: FileListItem[];
}

export interface DownloadTokenResponse {
	url: string;
	status: string;
	message: string;
}

export interface UploadServerResponse {
	url: string;
	id: string;
}

export interface UploadResult {
	incoming: number;
	links: Array<{
		download: string;
		filename: string;
		remove: string;
		size: string;
		whirlpool: string;
	}>;
}

export interface FileListResponse {
	status: string;
	count: number;
	items: FileListItem[];
}

export interface RemoveFilesResponse {
	status: string;
	removed: number;
	urls: string[];
}

export interface MoveFilesResponse {
	status: string;
	moved: number;
	urls: string[];
	filename?: string;
}

export interface RenameFilesResponse {
	status: string;
	renamed: number;
	urls: Array<{
		url: string;
		old_filename: string;
		new_filename: string;
	}>;
}

export interface CopyFilesResponse {
	status: string;
	copied: number;
	urls: Array<{
		from_url: string;
		to_url: string;
	}>;
	filename?: string;
}

export interface ChangeAttrResponse {
	status: string;
	updated: number;
	urls: string[];
}

export interface ScanFileResponse {
	status: string;
	message: string;
	date?: string;
}

export interface CreateFolderResponse {
	status: string;
	folder_id: number;
	name: string;
	message: string;
}

export interface ShareFolderResponse {
	status: string;
	url?: string;
	message: string;
}

export interface MoveFolderResponse {
	status: string;
	message: string;
	old_name?: string;
	new_name?: string;
}

export interface RemoveFolderResponse {
	status: string;
	message: string;
}

export interface UserInfoResponse {
	status: string;
	message: string;
	email: string;
	offer: number;
	'2fa': number;
	mail_rm: number;
	ftp_mode: number;
	ftp_did: number;
	ftp_report: number;
	ru_report: number;
	default_domain: number;
	page_limit: number;
	default_port: number;
	default_port_files: number;
	cdn: number;
	download_menu: number;
	use_cdn: number;
	subscription_end: string;
	default_quota: number;
	default_cold_storage_quota: number;
	hot_storage: number;
	cold_storage: number;
	stats_date: string;
	allowed_cold_storage: number;
	available_storage: number;
	available_cold_storage: number;
	extended_quota: number;
	extended_quota_end: string;
	overquota: number;
	upload_forbidden: number;
}

export interface RemoteUploadListResponse {
	status: string;
	data: Array<{
		id: number;
		request_date: string;
		execution_date: string;
	}>;
}

export interface RemoteUploadInfoResponse {
	id: number;
	request_date: string;
	execution_date: string;
	links: string[];
	result: Array<{
		status: string;
		url: string;
		download_link: string;
		message: string;
	}>;
}

export interface RemoteUploadRequestResponse {
	id: number;
	date: string;
	status: string;
	urls: string[];
	headers: Record<string, string>;
}

export interface VoucherListResponse {
	status: string;
	count: number;
	data: Array<{
		voucher: string;
		service: string;
	}>;
}

export interface VoucherCheckResponse {
	status: string;
	service: string;
}

export interface VoucherUseResponse {
	status: string;
	message: string;
}


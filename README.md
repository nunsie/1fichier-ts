# 1fichier-ts

A fully-typed TypeScript client for the [1fichier.com API](https://1fichier.com/api.html). Supports all endpoints from the official OpenAPI spec, including file upload/download, folder management, user info, remote upload, and vouchers.

## Features
- Full coverage of 1fichier.com API endpoints
- TypeScript types for all request/response schemas
- Modern async/await API
- Built-in authentication via API key
- Axios-based HTTP client
- Easy to extend and test

## Installation

```bash
npm install 1fichier
```

## Usage

### Basic Example

```typescript
import FichierApiClient from "1fichier";

const client = new FichierApiClient("YOUR_API_KEY");

// Generate a download token
const token = await client.getDownloadToken({ url: "https://1fichier.com/?example" });
console.log(token.url);

// List files in root folder
const files = await client.listFiles({ folder_id: 0 });
console.log(files.items);
```

### Authentication
All requests require a valid API key. Pass your API key when constructing the client:

```typescript
const client = new FichierApiClient("YOUR_API_KEY");
```

## API Reference

### File Operations
- `getDownloadToken(data)` - Generate a download token for a file
- `getFileInfo(data)` - Get detailed info about a file
- `listFiles(data)` - List files in a folder
- `scanFile(data)` - Scan a file for viruses
- `removeFiles(data)` - Remove files
- `moveFiles(data)` - Move files
- `renameFiles(data)` - Rename files
- `copyFiles(data)` - Copy files
- `changeFileAttr(data)` - Change file attributes

### Upload
- `getUploadServer(pretty)` - Get optimal upload server
- `uploadFiles(formData)` - Upload files (multipart/form-data)
- `getUploadResult(xid)` - Get upload result

### Folder Operations
- `listFolders(data)` - List folders
- `createFolder(data)` - Create a folder
- `shareFolder(data)` - Share a folder
- `moveFolder(data)` - Move a folder
- `removeFolder(data)` - Remove a folder

### User
- `getUserInfo(data)` - Get/set account info

### Remote Upload
- `listRemoteUploads()` - List remote uploads
- `getRemoteUploadInfo(id)` - Get remote upload info
- `requestRemoteUpload(data)` - Request remote upload

### Vouchers
- `listVouchers()` - List unused vouchers
- `checkVoucher(data)` - Check voucher validity
- `useVoucher(data)` - Use voucher

## TypeScript Types
All request and response schemas are fully typed. See [`src/types.ts`](src/types.ts) for details.

## Error Handling
All methods throw on HTTP/network errors. Use try/catch for error handling:

```typescript
try {
	const info = await client.getFileInfo({ url: "https://1fichier.com/?example" });
} catch (err) {
	console.error("API error", err);
}
```

## Testing
Unit tests are provided using [Vitest](https://vitest.dev/). Run tests with:

```bash
npm test
```

## Contributing

Contributions are welcome! To contribute:

1. Fork the repo and create your branch.
2. Write clear, tested code. Add/modify tests in `src/index.test.ts`.
3. Ensure all types are correct and documented.
4. Open a pull request with a detailed description.

### Development Setup

```bash
git clone https://github.com/nunsie/1fichier-ts.git
cd 1fichier-ts
npm install
npm test
```

### Coding Standards
- Use TypeScript strict mode
- Document all public methods
- Prefer async/await
- Write unit tests for new features

## License

MIT © 2025 Nusrath Khan

## Links
- [1fichier.com API Docs](https://1fichier.com/api.html)
- [OpenAPI Spec](./swagger.yml)
- [Issues](https://github.com/nunsie/1fichier-ts/issues)
- [Contributing Guide](#contributing)

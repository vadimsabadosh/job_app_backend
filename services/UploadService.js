const cloudinary = require("cloudinary").v2;

class UploadService {
	async _handleUpload(file) {
		const res = await cloudinary.uploader.upload(file, {
			resource_type: "auto",
			folder: "jobhub",
		});
		return res;
	}

	async uploadImage(file) {
		try {
			const b64 = Buffer.from(file.buffer).toString("base64");
			let dataURI = "data:" + file.mimetype + ";base64," + b64;
			const cldRes = await this._handleUpload(dataURI);
			return cldRes;
		} catch (error) {
			throw new Error(error);
		}
	}
}
module.exports = { UploadService };

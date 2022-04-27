const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

require('dotenv').config();

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET
});

const storage = new CloudinaryStorage({
	cloudinary,
	params: {
		folder: 'YelpCamp',
		allowed_formats: ['png', 'jpg', 'jpeg']
	}
})

module.exports = {
	cloudinary,
	storage
}
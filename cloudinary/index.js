// Require Cloudinary
const cloudinary = require('cloudinary');

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true
})

// Get all images from folder
module.exports = async (folder) => {
    const results = await cloudinary.v2.search
        .expression(`folder:${folder}`)
        .sort_by('created_at', 'desc')
        .fields('context')
        .fields('url')
        .execute();
    return (results);
}
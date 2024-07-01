// Require cloudinary
const getCloudinaryFolderContent = require("../cloudinary/index.js");


// Render Art Gallery
module.exports.renderArtGallery = (req, res) => {
    res.locals.title = "Art Gallery";
    res.render("hobbies/art-gallery");
};

// Render Photo Gallery
module.exports.renderPhotoGallery = (req, res) => {
    res.locals.title = "Photo Gallery";
    res.render("hobbies/photo-gallery")
};

// Render Image Viewer
module.exports.renderImageViewer = (req, res) => {
    res.locals.title = "Image Viewer";
    const { folder, assetId } = req.params;
    res.render("hobbies/image-viewer", { folder, assetId });
}

// Acquire Cloudinary folder content
module.exports.getCloudinaryFolderContent = async (req, res) => {
    const results = await getCloudinaryFolderContent(req.params.folder);
    res.status(200).json({ results })
}
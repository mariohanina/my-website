const express = require("express");
const router = express.Router();

const hobbiesController = require("../controllers/hobbies");

// Render Art Gallery
router.get("/art-gallery", hobbiesController.renderArtGallery);
// Render Photo Gallery
router.get("/photo-gallery", hobbiesController.renderPhotoGallery);
// Render Image Viewer
router.get("/image-viewer/:folder/:assetId", hobbiesController.renderImageViewer);
// Get list of files in Cloudinary Folder
router.get("/get-asset-list/:folder", hobbiesController.getCloudinaryFolderContent);


module.exports = router;
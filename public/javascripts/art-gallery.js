window.addEventListener('load', async () => {

    // Html elements
    const artworkWrapper = document.querySelector("#artwork-wrapper");
    const loader = document.querySelector("#loader");

    // Get list of all files in Cloudinary folder
    const res = await fetch(("/hobbies/get-asset-list/artwork"), { method: "GET" });
    const data = await res.json();

    // For each file in Cloudinary folder
    for (const entry of data.results.resources) {

        // Get file information
        const assetId = entry.asset_id;
        const name = entry.context.caption;
        const thumbnailUrl = entry.url.replace("upload", "upload/w_400");
        const width = entry.context.WidthFactor;
        const height = entry.context.HeightFactor;
        // const url = entry.url;
        // const description = entry.context.alt;


        // Calculate the flexGrow based on the proportions
        const initialWidth = (240 * (width / height));
        // MaxWidth
        const maxWidth = initialWidth * 3;
        // Calculate the width based on the proportions
        const flexGrow = (10 * (width / height));

        // Create Div
        const div = document.createElement("div");
        div.style.flexGrow = flexGrow;
        div.style.width = `${initialWidth}px`;
        div.style.maxWidth = `${maxWidth}px`;

        // Create a
        const aTag = document.createElement("a");
        aTag.href = `/hobbies/image-viewer/artwork/${assetId}`;

        // Create img
        const img = document.createElement("img");
        img.src = thumbnailUrl;
        img.alt = name;

        // Put the image inside the a tag
        aTag.appendChild(img);
        // Put the a tag (with the image inside) inside the div
        div.appendChild(aTag);
        // Put the whole thing inside the artworkWrapper
        artworkWrapper.appendChild(div);
    }

    loader.remove();
});
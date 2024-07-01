window.addEventListener('load', async () => {

    const photographyWrapper = document.querySelector("#photography-wrapper");

    const res = await fetch(("/hobbies/get-asset-list/photography"), { method: "GET" });
    const data = await res.json();


    for (const entry of data.results.resources) {
        const assetId = entry.asset_id;
        const name = entry.context.caption;
        const url = entry.url;
        const thumbnailUrl = entry.url.replace("upload", "upload/w_400");
        const description = entry.context.alt;

        // Create figure
        const figure = document.createElement("figure");

        // Create div
        const div = document.createElement("div");

        // Create a
        const aTag = document.createElement("a");
        // aTag.href = `/image-viewer/photography/${name}.jpg`;
        aTag.href = `/hobbies/image-viewer/photography/${assetId}`;

        // Create img
        const img = document.createElement("img");
        img.src = thumbnailUrl;
        img.alt = name;
        img.height = 220;
        img.width = 320;

        // Create figcaption
        const figcaption = document.createElement("figcaption");
        figcaption.innerHTML = `<b>${name}</b><br>${description}`;

        // Put the image inside the a tag
        aTag.appendChild(img);
        // Put the a tag (with the image inside) inside the div
        div.appendChild(aTag);
        // Put div inside the figure
        figure.appendChild(div);
        // Put figcaption inside the div
        figure.appendChild(figcaption);
        // Put the whole thing inside the photographyWrapper
        photographyWrapper.appendChild(figure);
    }
});
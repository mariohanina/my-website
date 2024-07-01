// Modal Related
// Html elements
// const modalClose = document.querySelector("#modal-close");
// const stopShowingBtn = document.querySelector("#stop-showing");
// modalClose.addEventListener("click", () => {
//     if (stopShowingBtn.checked) localStorage.setItem("first-time", "true");
//     modal.style.display = "none";
// });
// if (!localStorage.getItem("first-time")) modal.style.display = "flex";



// HTML elements
const image = document.querySelector("#image");
const scrollDiv = document.querySelector("#scrollable-container");

const prevButton = document.querySelector("#prev-img");
const nextButton = document.querySelector("#next-img");


// Variable declarations
let clicking = false;
let touching = false;
let previousX;
let previousY;
let maxDimension = 100;
let mainDim;
let npcDim;
let resources;
let index;


// Hide prevButton if first image, hide nextButton if last image. Display both otherwise. 
const toggleButtonDisplay = () => {
    prevButton.style.visibility = "initial";
    nextButton.style.visibility = "initial";

    if (index === 0) {
        prevButton.style.visibility = "hidden";
    } else if (index === (resources.length - 1)) {
        nextButton.style.visibility = "hidden";
    }
}

// Fetch all images in Cloudinary folder, find index of current image and display it
async function getFiles(folder, assetId) {
    const res = await fetch((`/hobbies/get-asset-list/${folder}`), { method: "GET" });
    const data = await res.json();
    resources = data.results.resources;


    for (let i = 0; i < resources.length; i++) {
        if (assetId === resources[i].asset_id) {
            index = i;
            break;
        }
    }

    image.src = resources[index].url;
    toggleButtonDisplay();
}


getFiles(folder, assetId)


// Add prevButton functionality
prevButton.addEventListener("click", (event) => {
    index -= 1;
    image.src = resources[index].url;
    toggleButtonDisplay();
})

// Add nextButton functionality
nextButton.addEventListener("click", (event) => {
    index += 1;
    image.src = resources[index].url;
    toggleButtonDisplay();
})


// If image is taller than window, height is the main dimensions.
// If image is wider than window, width is the main dimension.
function findDims() {
    const { innerWidth, innerHeight } = window;
    const isHeightLarger = ((innerWidth / innerHeight)
        > (image.naturalWidth / image.naturalHeight));

    mainDim = isHeightLarger ? "height" : "width";
    npcDim = isHeightLarger ? "width" : "height";

    zoom(innerWidth / 2, innerHeight / 2, 1);
}


// Zoom and then rescroll
const zoom = (x, y, zoomAmount) => {
    // Save the current scroll location of the image
    const { scrollLeft, scrollTop } = scrollDiv;

    // Make sure zoom is within limits
    const currentZoom = maxDimension;
    const newZoom = Math.min(1000, Math.max(currentZoom * zoomAmount, 100));
    const zoomRatio = newZoom / currentZoom;
    maxDimension = newZoom;

    // Apply zoom to html element
    image.style.maxWidth = `${maxDimension}vw`;
    image.style.maxHeight = `${maxDimension}vh`;
    image.style[mainDim] = `${maxDimension}v${mainDim[0]}`;
    image.style[npcDim] = `auto`;

    // Scroll the image
    scrollDiv.scrollLeft = ((scrollLeft + x) * zoomRatio) - x;
    scrollDiv.scrollTop = ((scrollTop + y) * zoomRatio) - y;
}

// Recalculate the main and npc dimensions when images loads or screen resizes
image.onload = findDims;
window.addEventListener("resize", findDims);

// Add the zoom functionality to wheel events
document.addEventListener("wheel", (e) => {
    //  || e.deltaY > 0 || e.deltaY < -50
    if (e.shiftKey) {
        zoom(e.clientX, e.clientY, Math.sign(e.deltaY) < 0 ? 1.05 : 1 / 1.05,)
    }
});

// Gradually zoom out when user doubleclicks
image.addEventListener("dblclick", (e) => {
    for (let index = 3; index < (50 * 3); index += 3) {
        setTimeout(() => {
            zoom(e.clientX, e.clientY, 1 / 1.05)
        }, index)
    }
});

// THE PANNING FUNCTIONALITY
scrollDiv.addEventListener("pointerdown", (e) => {
    if (!(e.pointerType === "mouse")) {
        return
    }
    e.preventDefault();
    previousX = e.clientX;
    previousY = e.clientY;
    clicking = true;
});

document.addEventListener("pointerup", (e) => {
    if (!(e.pointerType === "mouse")) {
        return
    }
    clicking = false;
});

scrollDiv.addEventListener("pointerleave", (e) => {
    if (!(e.pointerType === "mouse")) {
        return
    }
    clicking = false;
});

// Pan the image by scrolling
scrollDiv.addEventListener("pointermove", (e) => {
    if (!(e.pointerType === "mouse")) {
        return
    }
    if (clicking) {
        e.preventDefault();
        scrollDiv.scrollLeft = scrollDiv.scrollLeft + (previousX - e.clientX);
        scrollDiv.scrollTop = scrollDiv.scrollTop + (previousY - e.clientY);
        previousX = e.clientX;
        previousY = e.clientY;
    }
});
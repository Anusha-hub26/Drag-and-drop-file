const dropArea = document.getElementById("dropArea");
const fileInput = document.getElementById("fileInput");
const browseBtn = document.getElementById("browseBtn");
const preview = document.getElementById("preview");

// Open file dialog
browseBtn.addEventListener("click", () => {
    fileInput.click();
});

// Handle manual file select
fileInput.addEventListener("change", () => {
    handleFiles(fileInput.files);
});

// Prevent default drag behaviors
["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

// Highlight drop area
["dragenter", "dragover"].forEach(eventName => {
    dropArea.addEventListener(eventName, () => {
        dropArea.classList.add("highlight");
    });
});

["dragleave", "drop"].forEach(eventName => {
    dropArea.addEventListener(eventName, () => {
        dropArea.classList.remove("highlight");
    });
});

// Handle drop
dropArea.addEventListener("drop", (e) => {
    const files = e.dataTransfer.files;
    handleFiles(files);
});

// Display files
function handleFiles(files) {
    preview.innerHTML = "";

    Array.from(files).forEach(file => {
        const fileItem = document.createElement("div");
        fileItem.className = "file-item";

        // If image → show preview
        if (file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = function(e) {
                fileItem.innerHTML = `
                    <img src="${e.target.result}" width="120">
                    <p>${file.name}</p>
                `;
            };
            reader.readAsDataURL(file);
        } else {
            fileItem.innerHTML = `<p>📄 ${file.name}</p>`;
        }

        preview.appendChild(fileItem);
    });
}

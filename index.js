const accessKey = "EcGwQ5XLZmZhs75lqu4vbSrY4ongj6R_oh8fc1YlDX8";

const formElement = document.querySelector("form")
const inputElement = document.getElementById("search-input");
const searchElement = document.getElementById("search-results");
const showMore = document.getElementById("show-more-button");

let inputData = ""
let page = 1;

async function searchImages() {
    inputData = inputElement.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    console.log(url);
    const response = await fetch(url);
    const data = await response.json();

    const results = data.results

    if(page === 1){
        searchElement.innerHTML = ""
    }

    results.map((result) => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("col-md-4");
    
        const cardDiv = document.createElement('div');
        cardDiv.classList.add("card");
    
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;
        image.classList.add("card-img-top");
    
        const cardBody = document.createElement('div');
        cardBody.classList.add("card-body");
    
        const cardTitle = document.createElement('h5');
        cardTitle.classList.add("card-title");
        cardTitle.innerText = result.alt_description ? result.alt_description : "Image";
    
        // Create the download button
        const downloadButton = document.createElement('a');
        downloadButton.classList.add("btn", "btn-primary");
        downloadButton.href = result.urls.full;  // Full-resolution image for download
        downloadButton.setAttribute('download', '');
        downloadButton.innerText = 'Download';
    
        // Append title and download button to the card body
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(downloadButton);
    
        // Append the image and card body to the card div
        cardDiv.appendChild(image);
        cardDiv.appendChild(cardBody);
    
        // Append the card div to the image wrapper
        imageWrapper.appendChild(cardDiv);
    
        // Append the image wrapper to the search results section
        searchElement.appendChild(imageWrapper);
    });
    

    page++;
    if(page > 1){
        showMore.style.display = "block";
    }
}

formElement.addEventListener("submit", (event) =>{
    event.preventDefault();
    page = 1; 
    searchImages();
})

showMore.addEventListener("click", () => {
    searchImages();
})
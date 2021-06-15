// Actual gallery
let galleryJsonImgs = document.getElementById('gallery-json-imgs');

let script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

// Functions

Storage.prototype.setObj = function (key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function (key) {
    return JSON.parse(this.getItem(key))
}

function readFile() {

    const corHeaders = new Headers({ 'content-type': 'application/json', 'Access-Control-Allow-Origin': '*' });

    fetch('http://localhost:8000/images', {
        headers: corHeaders
    })
        .then(response => response.json())
        .then(data => localStorage.setObj('img-gallery', data));

}

function getCardTemplate(imgGallery, i) {

    /**
     * Card Template
     * 
     * <div class="card mb-3">
        <img src="..." class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">Some random text</p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div>
      </div>
     * 
     */
    
    let divElement = document.createElement('div');
    divElement.classList.add("col-4", "card","mb-3");

    let imgElement = document.createElement('img');
    imgElement.src = imgGallery[i].url;
    imgElement.alt = "Sorry , Image can't be displayed"
    imgElement.classList.add("img", "img-responsive", "card-img-top","gallery-card-items");

    let innerDivElement = document.createElement('div');
    innerDivElement.classList.add("card-body");

    let idElement = document.createElement('h5');
    idElement.textContent = "Image Id : " + imgGallery[i].id;
    idElement.classList.add('card-title','gallery-card-id');

    let nameElement = document.createElement('h4');
    nameElement.textContent = imgGallery[i].name;
    nameElement.classList.add('card-title','gallery-card-name');

    let descElement = document.createElement('p');
    descElement.textContent = imgGallery[i].description;
    descElement.classList.add('card-text','gallery-card-desc');

    let dateTimeElement = document.createElement('p');
    dateTimeElement.classList.add('card-text');

    let smallDateElement = document.createElement('small');
    smallDateElement.textContent = new Date(imgGallery[i].uploadTime);
    smallDateElement.classList.add('text-muted');

    //appending divs
    dateTimeElement.appendChild(smallDateElement);

    innerDivElement.appendChild(idElement);
    innerDivElement.appendChild(nameElement);
    innerDivElement.appendChild(descElement);
    innerDivElement.appendChild(dateTimeElement);

    divElement.appendChild(imgElement);
    divElement.appendChild(innerDivElement);

    galleryJsonImgs.appendChild(divElement);
}


function getImageTemplate(imgGallery, i) {
            let divElement = document.createElement('div');
    divElement.classList.add("col-4", "gallery-items");

    let imgElement = document.createElement('img');
    imgElement.src = imgGallery[i].url;
    imgElement.alt = "Sorry , Image can't be displayed";
    imgElement.classList.add("img", "img-responsive", "gallery-img-items");

    let idElement = document.createElement('h4');
    idElement.textContent = "Image Id : " + imgGallery[i].id;
    idElement.classList.add('gallery-img-id');

    let nameElement = document.createElement('h4');
    nameElement.textContent = imgGallery[i].name;
    nameElement.classList.add('gallery-img-name');

    let descElement = document.createElement('h5');
    descElement.textContent = imgGallery[i].description;
    descElement.classList.add('gallery-img-desc');

    let dateTimeElement = document.createElement('h5');
    dateTimeElement.textContent = new Date(imgGallery[i].uploadTime);
    dateTimeElement.classList.add('gallery-img-name');

    divElement.appendChild(imgElement);
    divElement.appendChild(idElement);
    divElement.appendChild(nameElement);
    divElement.appendChild(descElement);
    divElement.appendChild(dateTimeElement);


    galleryJsonImgs.appendChild(divElement);
}

window.addEventListener('load', () => {
            readFile();

    let imgGallery = localStorage.getObj('img-gallery');

    for (i = 0; i < imgGallery.length; i++){
            getCardTemplate(imgGallery, i);
    }
});



// Forms to be displayed
let galleryAddImageForm = document.getElementById('gallery-add-image-form');
let galleryEditImageForm = document.getElementById('gallery-edit-image-form');
let galleryDeleteImageForm = document.getElementById('gallery-delete-image-form');

let alertGalleryForm = document.getElementById('alert-gallery-form');

let addImageTab = document.getElementById('add-image-tab');
let editImageTab = document.getElementById('edit-image-tab');
let deleteImageTab = document.getElementById('delete-image-tab');



Storage.prototype.setObj = function (key, obj) {
  return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function (key) {
  return JSON.parse(this.getItem(key))
}


function isUriImage(uri) {

  uri = uri.split('?')[0];
  let parts = uri.split('.');
  let extension = parts[parts.length - 1];
  let imageTypes = ['jpg', 'jpeg', 'tiff', 'png', 'gif', 'bmp'];
  if (imageTypes.indexOf(extension) !== -1) {
    return true;
  }
  return false;
}

function getRandomId() {
  return '_' + Math.random().toString(36).substr(2, 9);
};

function displayAlert(alertForm, classToAdd, textToAdd, classToRemove) {
  alertForm.hidden = false;
  alertForm.style = 'display: flex';
  alertForm.classList.add(...classToAdd);
  alertForm.textContent = textToAdd;
  alertForm.classList.remove(...classToRemove);
}


function validateForm(imageURL, imageUploadDate) {


  if (!isUriImage(imageURL)) {
    displayAlert(alertGalleryForm, ['text-center', 'alert-danger', 'justify-content-center'],
      'Please enter a valid image URL', ['alert-success']);
    return false;
  }

  let dateConverted = new Date(imageUploadDate);
  let currentDate = new Date();

  if (dateConverted.getTime() > currentDate.getTime()) {
    displayAlert(alertGalleryForm, ['text-center', 'alert-danger', 'justify-content-center'],
      'The date entered is invalid. Please enter a valid date', ['alert-success']);
    return false;
  }

  return true;
}

function validateId(imageId) {
  let imgGallery = localStorage.getObj('img-gallery');

  for (i = 0; i < imgGallery.length; i++) {
    if (imgGallery[i].id === imageId) {
      return true;
    }
  }

  displayAlert(alertGalleryForm, ['text-center', 'alert-danger', 'justify-content-center'],
    'The image ID entered is invalid. Please enter a valid image ID', ['alert-success']);

  return false;
}


galleryAddImageForm.addEventListener('submit', (event) => {

  let addImageURL = document.forms["addImageForm"]["addImageURL"].value;
  let addImageName = document.forms["addImageForm"]["addImageName"].value;
  let addImageDesc = document.forms["addImageForm"]["addImageDesc"].value;
  let addImageUploadDate = document.forms["addImageForm"]["addImageUploadDate"].value;

  event.preventDefault();

  if (!validateForm(addImageURL, addImageUploadDate)) {
    return false;
  }

  const data = {
    id: getRandomId(),
    url: addImageURL,
    name: addImageName,
    description: addImageDesc,
    uploadTime: addImageUploadDate
  }

  fetch('http://localhost:8000/images', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(data => {
      displayAlert(alertGalleryForm, ['text-center', 'alert-success', 'justify-content-center'],
        'The image has been successfully uploaded to the gallery', ['alert-danger']);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

  return true;
});

galleryEditImageForm.addEventListener('submit', (event) => {

  let editImageId = document.forms["editImageForm"]["editImageId"].value;
  let editImageURL = document.forms["editImageForm"]["editImageURL"].value;
  let editImageName = document.forms["editImageForm"]["editImageName"].value;
  let editImageDesc = document.forms["editImageForm"]["editImageDesc"].value;
  let editImageUploadDate = document.forms["editImageForm"]["editImageUploadDate"].value;

  event.preventDefault();

  if (!validateId(editImageId)) {
    return false;
  }

  if (!validateForm(editImageURL, editImageUploadDate)) {
    return false;
  }

  const data = {
    id: editImageId,
    url: editImageURL,
    name: editImageName,
    description: editImageDesc,
    uploadTime: editImageUploadDate
  }

  fetch('http://localhost:8000/images/' + editImageId, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(data => {
      displayAlert(alertGalleryForm, ['text-center', 'alert-success', 'justify-content-center'],
        'The image has been successfully updated', ['alert-danger']);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

  return true;
});

galleryDeleteImageForm.addEventListener('submit', (event) => {

  let deleteImageId = document.forms["deleteImageForm"]["deleteImageId"].value;

  event.preventDefault();

  if (!validateId(deleteImageId)) {
    return false;
  }

  fetch('http://localhost:8000/images/' + deleteImageId, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(data => {
      displayAlert(alertGalleryForm, ['text-center', 'alert-success', 'justify-content-center'],
        'The image has been successfully deleted from the gallery', ['alert-danger']);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

  return true;
});


addImageTab.addEventListener('click',() => {
    alertGalleryForm.hidden = true;
});

editImageTab.addEventListener('click',() => {
  alertGalleryForm.hidden = true;
});

deleteImageTab.addEventListener('click',() => {
  alertGalleryForm.hidden = true;
});



import axios from 'axios';
import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const breedSelect = document.querySelector('.breed-select');
const divPic = document.querySelector('.cat-info-pict');
const divDesc = document.querySelector('.cat-info-desc');
const loader = document.querySelector('.loader');

breedSelect.addEventListener('change', onChangeSelect);

fetchAndRenderBreeds();

function fetchAndRenderBreeds() {
  loader.classList.remove('unvisible');

  fetchBreeds()
    .then(breeds => renderBreedSelect(breeds))
    .catch(error => {
      console.error(error);
      Notiflix.Notify.failure(
        `Oops! Failed to fetch breeds. Error: ${error.message}`,
        {
          position: 'center-top',
          distance: '20px',
        }
      );
    })
    .finally(() => {
      loader.classList.add('unvisible');
    });
}

function onChangeSelect(event) {
  loader.classList.remove('unvisible');
  divPic.innerHTML = '';
  divDesc.innerHTML = '';
  const breedId = event.target.value;
  console.log('breedId: ', breedId);
  fetchCatByBreed(breedId)
    .then(breed => renderBreedDesc(breed))
    .catch(error => {
      console.error(error);
      Notiflix.Notify.failure(
        `Oops! Failed to fetch cat by breed. Error: ${error.message}`
      );
    })
    .finally(() => loader.classList.add('unvisible'));
}

function renderBreedSelect(breeds) {
  const markup = breeds
    .map(breed => {
      return `<option value="${breed.reference_image_id}">${breed.name}</option>`;
    })
    .join('');
  breedSelect.insertAdjacentHTML('beforeend', markup);

  new SlimSelect({
    select: '#single',
  });

  breedSelect.classList.add('unvisible'); // Przenieś to tutaj
}

function renderBreedDesc(breed) {
  const markupImg = `<img class="cat-img" src="${breed.url}" alt="${breed.id}">`;
  const markupDesc = `<h2 class="cat-desc-title">${breed.breeds[0].name}</h2>
    <p class="cat-info-desc-txt">${breed.breeds[0].description}</p>
    <p class="cat-info-desc-temp"><b>Temperament:</b> ${breed.breeds[0].temperament}</p>`;
  divPic.insertAdjacentHTML('beforeend', markupImg);
  divDesc.insertAdjacentHTML('beforeend', markupDesc);
}

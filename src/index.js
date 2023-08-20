import Notiflix from 'notiflix';
import pixabayAPI from './pixabayApi';
import { createMarkup } from './markupImages';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


// Створюємо екземпляр класу для роботи з Pixabay API
const pixabayApiInstance = new pixabayAPI(); 
const ref = {
  form: document.querySelector('.search-form'), // Знаходимо форму пошуку
  gallery: document.querySelector('.gallery'), // Знаходимо контейнер для відображення зображень
  btnLoadMore: document.querySelector('.load-more'), // Знаходимо кнопку "Завантажити ще"
};


// Створюємо об'єкт для SimpleLightbox
const lightbox = new SimpleLightbox('.gallery a', { 
  captions: true,
  captionDelay: 250,
});
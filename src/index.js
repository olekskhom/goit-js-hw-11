import Notiflix from 'notiflix';
import pixabayAPI from './pixabayApi';
import { createMarkup } from './markupImages';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


// Створюємо екзимпляр класу для роботи з Pixabay API
const pixabayApiInstance = new pixabayAPI(); 
const ref = {
  form: document.querySelector('.search-form'), // Знаходимо форму пошуку
  gallery: document.querySelector('.gallery'), // Знаходимо контейнер для відображення зображень
  btnLoadMore: document.querySelector('.load-more'), // Знаходимо кнопку "Завантажити ще"
};


// Створюємо обьєкт для SimpleLightbox
const lightbox = new SimpleLightbox('.gallery a', { 
  captions: true,
  captionDelay: 250,
});


// Налаштовуємо опції для повідомлень Notiflix
const notiflixOptions = {
  width: '300px',
  position: 'center-center',
  borderRadius: '12px',
  timeout: 2000,
  cssAnimationStyle: 'zoom',
};

// Змінна для відстеження кількісті показаних зображень
let isShow = 0;

// Додаємо обробник події для форми пошуку
ref.form.addEventListener('submit', handlerSearchImg);

// Додаємо обробник події для кнопки "Завантажити ще"
ref.btnLoadMore.addEventListener('click', handlerBtnLoadMoreClick);

// Приховуємо кнопку "Завантажити ще" за замовчуванням
ref.btnLoadMore.classList.add('is-hidden');



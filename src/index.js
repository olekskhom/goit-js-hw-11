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


// Обробник події для подання форми пошуку
function handlerSearchImg(e) {
  e.preventDefault();

  // Очищаємо контейнер для зображень і скидаємо сторінку
  ref.gallery.innerHTML = '';
  ref.btnLoadMore.classList.add('is-hidden');

  // Отримуємо термін пошуку з форми
  pixabayApiInstance.page = 1;
  pixabayApiInstance.searchTerm = ref.form[0].value.trim();
    isShow = 0;
    
    // Перевіряємо, чи заповнено поле для пошуку
  if (pixabayApiInstance.searchTerm === '') {
    Notiflix.Notify.warning('Please, fill the main field', notiflixOptions);
    return;
  }

  // Викликаємо функцію для завантаження зображень
  fenchGallery();
}


// Асинхронна функція для завантаження зображень
async function fenchGallery() {
  // Виконуємо HTTP-запит до Pixabay API і отримуємо результат
  const response = await pixabayApiInstance.fetchImg();
  const { hits, totalHits } = response;

  // Оновлюємо кількість показаних зображень
  isShow += hits.length;

  // Перевіряємо результат запиту та кількість показаних зображень
  if (!hits.length || isShow >= totalHits) {
    // Якщо зображень не знайдено або показані всі доступні
    ref.btnLoadMore.classList.add('is-hidden');
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else if (isShow < totalHits) {
    // Якщо ще є доступні зображення для завантаження
    ref.btnLoadMore.classList.remove('is-hidden');
    Notiflix.Notify.success(
      `Hooray! We found ${totalHits} images.`,
      notiflixOptions
    );
  }

  // Додаємо зображення до контейнера
  ref.gallery.insertAdjacentHTML('beforeend', createMarkup(hits));

  // Оновлюємо SimpleLightbox для нових зображень
  lightbox.refresh();
}


// Обробник події для кнопки "Завантажити ще "
function handlerBtnLoadMoreClick() {

  // Збільшуємо номер сторінки для завантаження наступних зображень
  pixabayApiInstance.incrementPage();

  // Викликаємо функцію для завантаження зображень
  fenchGallery();
}

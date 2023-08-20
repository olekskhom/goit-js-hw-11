export function createMarkup(arr) {
  const markupImg = arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<div class="photo-card">
 <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" width="200" /></a>
 <div class="info">
  <p class="info-item">
    <b>Likes ${likes}</b>
  </p>
  <p class="info-item">
    <b>Views ${views}</b>
  </p>
  <p class="info-item">
    <b>Comments ${comments}</b>
  </p>
  <p class="info-item">
    <b>Downloads ${downloads}</b>
  </p>
 </div>
 </div>`
    )
    .join('');
  return markupImg;
}
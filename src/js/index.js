import '../css/styles.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('#search-form'),
  galleryContainer: document.querySelector('.gallery'),
  loadBtn: document.querySelector('.load-more'),
};

refs.loadBtn.style.display = 'none';

refs.form.addEventListener('submit', onSubmit);
refs.loadBtn.addEventListener('click', onClick);

function onSubmit(event) {
  event.preventDefault();
  refs.gallery.innerHTML = '';
  const name = event.target.value.trim();
  if (name !== '') {
    return queryImage(name);
  }
  refs.loadBtn.style.display = 'none';
  return Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

function onClick() {}

function renderGallery(images) {
  return images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        `<a class="gallery__link" href="${largeImageURL}">
            <div class="photo-card">
                <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                <div class="info">
                    <p class="info-item">
                        <b>Likes</b>
                        ${likes}
                    </p>
                    <p class="info-item">
                        <b>Views</b>
                        ${views}
                    </p>
                    <p class="info-item">
                        <b>Comments</b>
                        ${comments}
                    </p>
                    <p class="info-item">
                        <b>Downloads</b>
                        ${downloads}
                    </p>
                </div>
            </div>
        </a>`;
      }
    )
    .join('');
}

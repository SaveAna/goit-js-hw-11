import '../css/styles.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { axiosAPI } from './axios';

const refs = {
  form: document.querySelector('#search-form'),
  galleryContainer: document.querySelector('.gallery'),
  loadBtn: document.querySelector('.load-more'),
};

let simpleLightBox = new SimpleLightbox('.gallery .gallery__link');
let name = '';
let page = 1;
const perPage = 40;

refs.loadBtn.style.display = 'none';

refs.form.addEventListener('submit', onSubmit);
refs.loadBtn.addEventListener('click', onClick);

function onSubmit(event) {
  event.preventDefault();

  page = 1;
  name = event.currentTarget.searchQuery.value.trim();
  console.log(name);
  if (!name) {
    return;
  }
  refs.galleryContainer.innerHTML = '';
  axiosAPI(name, page, perPage)
    .then(({ data }) => {
      if (data.totalHits === 0) {
        refs.loadBtn.style.display = 'none';
        refs.galleryContainer.innerHTML = '';
        return Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else if (data.totalHits > perPage) {
        refs.loadBtn.style.display = 'block';
      } else if (data.totalHits < perPage && data.totalHits != 0) {
        refs.loadBtn.style.display = 'none';
      }
      createMarkup(data.hits);
      console.log(data.hits);
      simpleLightBox = new SimpleLightbox('.gallery .gallery__link').refresh();
      Notify.success(`Hooray! We found ${data.totalHits} images.`);
    })
    .catch(error => {
      return 0;
    });
}

function onClick() {
  page += 1;
  axiosAPI(name, page, perPage)
    .then(({ data }) => {
      createMarkup(data.hits);
      console.log(data.hits);
      simpleLightBox.refresh();
      if (page * perPage >= data.totalHits) {
        refs.loadBtn.style.display = 'none';
      }
      smoothScroll();
    })
    .catch(error => {
      return 0;
    });
}

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
        return `<a class="gallery__link" href="${largeImageURL}">
                  <div class="photo-card">
                    <img class="card-image" src="${webformatURL}" alt="${tags}" loading="lazy" />
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

function createMarkup(markup) {
  return refs.galleryContainer.insertAdjacentHTML(
    'beforeend',
    renderGallery(markup)
  );
}

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

import refs from './tools/refs';
import { PixabayAPI } from './api/PixabayAPI';
import {
  notifyError,
  notifyNoMorePhotos,
  notifySuccess,
} from './tools/notifyControls';
import createGalleryCards from '../templates/gallery-card.hbs';
import { showLoadMoreBtn, hideLoadMoreBtn } from './tools/loadMoreBtnControl';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const { form, gallery, loadMoreBtn } = refs;
const pixabayAPI = new PixabayAPI();
const gallerySimpleLightbox = new SimpleLightbox('.gallery a');
const observerOptions = {
  root: null,
  rootMargin: '100px',
  threshold: 1,
};

let observer = new IntersectionObserver(onScroll, observerOptions);

form.addEventListener('submit', searchOnSubmit);
// loadMoreBtn.addEventListener('click', loadMore);

async function searchOnSubmit(e) {
  e.preventDefault();

  const searchQuery = e.currentTarget.elements[0].value.trim();
  pixabayAPI.query = searchQuery;
  pixabayAPI.page = 1;

  try {
    if (!searchQuery) {
      onBadRequest();
      return;
    }

    const photos = await pixabayAPI.fetchPhotos(searchQuery);

    if (!photos.data.hits.length) {
      onBadRequest();
      e.target.reset();
      return;
    }

    notifySuccess(photos.data.totalHits);
    gallery.innerHTML = createGalleryCards(photos.data.hits);
    gallerySimpleLightbox.refresh();

    observer.observe(gallery.lastElementChild);
    // showLoadMoreBtn();
  } catch (error) {
    console.error(error);
    notifyError();
  }
}

async function loadMore() {
  pixabayAPI.page += 1;

  try {
    const cardsShown = pixabayAPI.page * pixabayAPI.limit;
    const booksToLoad = await pixabayAPI.fetchPhotos();

    if (cardsShown >= booksToLoad.data.totalHits) {
      // hideLoadMoreBtn();
      notifyNoMorePhotos();
    }
    gallery.insertAdjacentHTML(
      'beforeend',
      createGalleryCards(booksToLoad.data.hits)
    );
    gallerySimpleLightbox.refresh();
    observer.observe(gallery.lastElementChild);
  } catch (error) {
    console.error(error);
    return;
  }
}
function onScroll(entries, observer) {
  if (entries[0].isIntersecting) {
    loadMore();
  }
}
function clearGallery() {
  gallery.replaceChildren();
}
function onBadRequest() {
  clearGallery();
  notifyError();
  hideLoadMoreBtn();
}

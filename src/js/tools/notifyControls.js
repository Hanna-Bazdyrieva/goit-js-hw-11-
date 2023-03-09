import { Notify } from 'notiflix';

const options = {
  fontSize: '20px',
  width: '550px',
  position: 'center-center',
  backOverlay: true,
  timeout: 1200,
};

function notifySuccess(number) {
  Notify.success(`Hooray! We found ${number} images for you.`, options);
}

function notifyError() {
  Notify.failure(
    `Sorry, there are no images matching your search query. Please try again`,
    options
  );
}

function notifyNoMorePhotos() {
  Notify.warning(
    "We're sorry, but you've reached the end of search results.",
    options
  );
}
export { notifySuccess, notifyError, notifyNoMorePhotos };

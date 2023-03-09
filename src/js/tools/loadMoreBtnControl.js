import refs from './refs';

const { loadMoreBtn } = refs;

function showLoadMoreBtn() {
  loadMoreBtn.classList.remove('is-hidden');
}

function hideLoadMoreBtn() {
  loadMoreBtn.classList.add('is-hidden');
}
export { showLoadMoreBtn, hideLoadMoreBtn };

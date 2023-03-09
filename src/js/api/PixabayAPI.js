import notifyError from '../tools/notifyControls';
import axios from 'axios';
export class PixabayAPI {
  #BASE_URL = 'https://pixabay.com/api/';
  #API_KEY = '33900155-ddf1dfbe75f3fcb3b163d9a71';

  constructor() {
    this.page = 1;
    this.limit = 40;
    this.query = null;
  }
  async fetchPhotos(searchQuery) {
    const searchParams = new URLSearchParams({
      key: this.#API_KEY,
      q: this.query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: this.limit,
      page: this.page,
    });

    const urlSearch = `${this.#BASE_URL}?${searchParams}`;

    return await axios.get(urlSearch);

    // try {
    //   const photoResponse = await axios.get(urlSearch);
    //   console.log(photoResponse);
    //   return photoResponse;
    // } catch (error) {
    //   console.error(error);
    //   notifyError();
    // }
  }

  //   return fetch(urlSearch)
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error();
  //       }
  //       return response.json();
  //     })
  //     .catch(error => {
  //       notifyError();
  //     });
  // }
}

// const BASE_URL = 'https://pixabay.com/api/';
// const API_KEY = '33900155-ddf1dfbe75f3fcb3b163d9a71';
// let page = 1;
// let limit = 40;

// const searchParams = new URLSearchParams({
//   key: API_KEY,
//   image_type: 'photo',
//   orientation: 'horizontal',
//   safesearch: 'true',
//   per_page: limit,
// });

// function fetchPhotos(searchQuery, key) {
//   if (searchQuery !== sessionStorage.getItem(key)) {
//     page = 1;
//   }
//   return fetch(`${BASE_URL}?q=${searchQuery}&${searchParams}&page=${page}`)
//     .then(response => {
//       console.log('fethcPhotos -> response:', response);
//       if (!response.ok) {
//         throw new Error();
//       }
//       page += 1;
//       return response.json();
//     })
//     .catch(error => {
//       console.log('fethcPhotos -> error:', error);
//       Notify.failure(
//         'Sorry, there are no images matching your search query. Please try again.'
//       );
//     });
// }
// export default fetchPhotos;

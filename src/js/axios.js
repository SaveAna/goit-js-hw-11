import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';
const API_KEY = '35041126-c969f82855a4c8ea112aa3b64';

async function axiosAPI(q, page, perPage) {
  const response = await axios.get(
    `?key=${API_KEY}&q=${q}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
  );
  return response;
}

export { fetchImages };

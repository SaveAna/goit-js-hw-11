import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';
const API_KEY = '35041126-c969f82855a4c8ea112aa3b64';

async function axiosAPI(name, page, perPage) {
  try {
    const response = await axios.get(
      `?key=${API_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
    );
    return response;
  } catch (error) {
    console.log(error.message);
  }
}

export { axiosAPI };

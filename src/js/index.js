import '../css/styles.css';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const SEARCH_URL = 'https://pixabay.com/api/';
const API_KEY = '35041126-c969f82855a4c8ea112aa3b64';

const refs = {
  form: document.querySelector('.search-form'),
  galleryContainer: document.querySelector('.gallery'),
};

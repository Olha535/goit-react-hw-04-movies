import axios from 'axios';
import { BASE_URL, API_KEY } from '../services/constants';

export async function fetchTrending(page = 1) {
  const url = `${BASE_URL}trending/movie/week?api_key=${API_KEY}&page=${page}`;
  const { data } = await axios.get(url);
  return data.results;
}

export async function fetchKeyword(searchQuery, page = 1) {
  const url = `${BASE_URL}search/movie?api_key=${API_KEY}&query=${searchQuery}&page=${page}&language=en-US&page=1&include_adult=false`;
  const { data } = await axios.get(url);
  return data;
}

export async function fetchDetails(movieId) {
  const url = `${BASE_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
  const { data } = await axios.get(url);
  return data;
}

export async function fetchCredits(movieId) {
  const url = `${BASE_URL}movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`;
  const { data } = await axios.get(url);

  return data.cast;
}

export async function fetchReviews(movieId) {
  const url = `${BASE_URL}movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=1`;
  const { data } = await axios.get(url);

  return data.results;
}

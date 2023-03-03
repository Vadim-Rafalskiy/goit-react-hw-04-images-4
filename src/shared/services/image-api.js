import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api',
  params: {
    key: '32223150-dddf312f26d3017ef1e9616a6',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: '12',
  },
});

export const searchImage = async (q, page = 1) => {
  const { data } = await instance.get('/', {
    params: {
      q,
      page,
    },
  });
  return data;
};

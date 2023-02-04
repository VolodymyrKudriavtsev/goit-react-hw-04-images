import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '31991210-5d8d315bab6d2995c6cf86716',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  },
});

export const searchImage = async (q, page) => {
  const { data } = await instance.get('?', { params: { q, page } });
  return data;
};

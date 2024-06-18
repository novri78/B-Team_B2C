import axios from 'axios';

const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

axios.defaults.baseURL = 'https://api.escuelajs.co/api/v1'; // Ganti dengan URL backend API Anda

export default axios;
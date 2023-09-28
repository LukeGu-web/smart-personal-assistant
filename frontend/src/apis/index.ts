import axios from 'axios';

const api_site = import.meta.env.VITE_API_SITE;

export const apiInstance = axios.create({
  baseURL: api_site,
  timeout: 6000,
  headers: {
    'Access-Control-Request-Headers': 'x-requested-with, Content-Type',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
  },
});

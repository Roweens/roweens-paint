import axios from 'axios';

export const $api = axios.create({
    baseURL: __HTTP_API_URL__,
});

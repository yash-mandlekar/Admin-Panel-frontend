import axios from 'axios';

const Axios = axios.create({
    // baseURL: 'http://52.66.186.55/',
    baseURL: 'http://localhost:4000/',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default Axios;
import axios from 'axios';


const http = axios.create({
    baseURL: 'http://assignment.bunq.com'
});

http.interceptors.request.use(config => {
    return config;
});

http.interceptors.response.use(response => {
    console.log(response);

    return response.data;
});

export default http;

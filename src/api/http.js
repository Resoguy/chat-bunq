import axios from 'axios';


const http = axios.create({
    baseURL: 'http://assignment.bunq.com'
});

http.interceptors.response.use(
    response => response.data,
    error => {
        // No New Messages is from polling returns as 503 error
        if (error.response.status !== 503) {
            return window.alert(error.response.data);
        }

        // Throw back to the thunk the no new message error
        throw error;
    }
);

export default http;

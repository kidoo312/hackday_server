/**
 * Created by kidoo.han on 27/04/2019
 */
import axios from 'axios';

/**
 * 모든 axios 요청의 timeout 은 20초로 설정
 */
axios.defaults.timeout = 20000;

/**
 * response interceptor
 */
axios.interceptors.response.use(
    (response) => {
        // Do something with response data
        return response;
    },
    (err) => {
        // Do something with response error
        return Promise.reject(err);
    },
);

export default axios;
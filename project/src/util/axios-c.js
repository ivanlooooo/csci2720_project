//Group members
//Hung Man Kei   (1155127099)	 Ng Megan Hoi Ling (1155124894)
//Ching Sze Yuen (1155126621)    Tsai Kwun Ki      (1155126289)

import axios from 'axios';
import QS from 'qs';

axios.defaults.timeout = 100000

axios.interceptors.request.use(config => {
    return config;
});

axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error);
    }
);

export function get (url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err)
        })
    });
}

export function post (url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, QS.stringify(params))
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err)
            })
    });
}



export function patch (url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.patch(url, data).then(response => {
            resolve(response.data);
        }, err => {
            reject(err)
        })
    })
}

export function put (url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.put(url, data).then(response => {
            resolve(response.data);
        }, err => {
            reject(err);
        })
    })
}
export function del (url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.delete(url, data).then(response => {
            resolve(response.data);
        }, err => {
            reject(err);
        })
    })
}


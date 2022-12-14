//Group members
//Hung Man Kei   (1155127099)	 Ng Megan Hoi Ling (1155124894)
//Ching Sze Yuen (1155126621)    Tsai Kwun Ki      (1155126289)

import { get, post, patch, put, del } from './axios-c';
const API_KEY = "AIzaSyCvHcIZbtF80KUW23vCV_kmmr2EVixerAI";
// const mpc = "https://maps.googleapis.com/maps/api/place";
const mpc = "/mpc";


export const _reg = async (data) => await post('http://csci2720-g105.cse.cuhk.edu.hk/users/reg', data)
export const _update = async (data) => await post('http://csci2720-g105.cse.cuhk.edu.hk/users/update', data)
export const _login = async (data) => await post('http://csci2720-g105.cse.cuhk.edu.hk/users/login', data)

export const _getUserList = async () => await get(`http://csci2720-g105.cse.cuhk.edu.hk/users`)
export const _delUser = async (id) => await get(`http://csci2720-g105.cse.cuhk.edu.hk/users/del?id=${id}`)


export const _addNewPlace = async (data) => await post('http://csci2720-g105.cse.cuhk.edu.hk/addNewPlace', data)
export const _addPlace = async (data) => await post('http://csci2720-g105.cse.cuhk.edu.hk/addPlace', data)
export const _saveJson = async (data) => await post('http://csci2720-g105.cse.cuhk.edu.hk/saveJson', data, {
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "*",
        "Content-Type": "application/x-www-form-urlencoded"
    }
})
export const _saveReviewsJson = async (data) => await post('http://csci2720-g105.cse.cuhk.edu.hk/saveReviewsJson', data, {
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "*",
        "Content-Type": "application/x-www-form-urlencoded"
    }
})
export const _updateText = async (data) => await post('http://csci2720-g105.cse.cuhk.edu.hk/updateText', data, {
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "*",
        "Content-Type": "application/x-www-form-urlencoded"
    }
})
export const _getJson = async () => await get('http://csci2720-g105.cse.cuhk.edu.hk/getJson')


export const _getPidsList = async (url) => await get(`${mpc}${url}`)

export const _getPinfosList = async (url) => await get(`${mpc}${url}`)

export const _getPlaceInfo = async (id) => await get(`http://csci2720-g105.cse.cuhk.edu.hk/getPlaceInfo?place_id=${id}`)


export const _getFavsList = async (id) => await get(`http://csci2720-g105.cse.cuhk.edu.hk/getFavsList?user_id=${id}`)

export const _getPlacesLists = async () => await get(`http://csci2720-g105.cse.cuhk.edu.hk/getPlacesLists`)
export const _delPlace = async (id) => await get(`http://csci2720-g105.cse.cuhk.edu.hk/delPlace?id=${id}`)
export const _updatePlace = async (data) => await post(`http://csci2720-g105.cse.cuhk.edu.hk/updatePlace`, data)





export const _getTenData = async () => await get(`http://csci2720-g105.cse.cuhk.edu.hk/tenData`)

export const _getDaysData = async () => await get(`http://csci2720-g105.cse.cuhk.edu.hk/daysData`)













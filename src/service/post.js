import axios from 'axios';

const api = process.env.VUE_APP_API+'/api/v1/article';

const getAllPost = async (limit, offset) => {
    let url = api+'/'+limit+'/'+offset;
    return await  axios.request({
        method: 'GET',
        url,
        headers: {
          'Content-Type': 'application/json'
        }
    });
}

const getById = async (id) => {
    let url = api+'/'+id;
    return await  axios.request({
        method: 'GET',
        url,
        headers: {
          'Content-Type': 'application/json'
        }
    });
}

const update = async (id, data) => {
    let url = api+'/'+id;
    return await  axios.request({
        method: 'POST',
        url,
        data:data,
        headers: {
          'Content-Type': 'application/json'
        }
    });
}

const insert = async (data) => {
    let url = api;
    return await  axios.request({
        method: 'POST',
        url,
        data:data,
        headers: {
          'Content-Type': 'application/json'
        }
    });
}

const deleteById = async (id) => {
    let url = api+'/'+id;
    return await  axios.request({
        method: 'GET',
        url,
        headers: {
          'Content-Type': 'application/json'
        }
    });
}

export default {
    getAllPost:getAllPost,
    getById:getById,
    update:update,
    insert:insert,
    deleteById:deleteById,
    urlApi:api
}
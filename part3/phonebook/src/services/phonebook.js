import axios from "axios";

const baseUrl = '/api/persons'

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const postNew = (object) => {
    return axios.post(baseUrl, object).then(response => response.data)
}

const deletePhone = (id) => {
    return axios.delete(`${baseUrl}/${id}`).then(response => response.data)
}

const updatePhone = (id, object) => {
    return axios.put(`${baseUrl}/${id}`,object).then(response => response.data)
}

export default {getAll, postNew, deletePhone, updatePhone}
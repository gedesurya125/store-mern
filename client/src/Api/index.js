import axios from 'axios';

const url = "http://localhost:5000/item";

export const fetchAllItems = () => axios.get(url);
export const postItem = (newItem, progress) => axios.post(url, newItem, {
    onUploadProgress: progressEvent => progress(progressEvent.loaded, progressEvent.total),
});

export const updateItemById = (id, newItem) => axios.put(`${url}/${id}`, newItem);

export const deleteItemById = (id) => axios.delete(`${url}/${id}`);

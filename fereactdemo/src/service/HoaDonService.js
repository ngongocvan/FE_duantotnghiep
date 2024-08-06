import axios from "axios";

const REST_API_BASE_URL = "http://localhost:2003/api/hoaDon";


export const getHoaDon = () => axios.get(REST_API_BASE_URL);

export const updateHoaDon = (id, hoaDon) => axios.put(`${REST_API_BASE_URL}/update/${id}`, hoaDon);

export const detailHoaDon = (id) => axios.get(`${REST_API_BASE_URL}/detail/${id}`);
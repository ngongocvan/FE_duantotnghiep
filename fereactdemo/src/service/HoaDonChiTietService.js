import axios from "axios";

const REST_API_BASE_URL = "http://localhost:2003/api/hoaDonChiTiet";


export const getHoaDonChiTiet = () => axios.get(REST_API_BASE_URL);

export const updateHoaDonChiTiet = (id, hoaDon) => axios.put(`${REST_API_BASE_URL}/update/${id}`, hoaDon);

export const detailHoaDonChiTiet = (id) => axios.get(`${REST_API_BASE_URL}/detail/${id}`);
import React, { useEffect, useState } from "react";
import './ProfileUser.css';
import { Profile } from "./Profile";
import Sidebar from "../sidebar/Sidebar";
import { Header } from "../header/Header";
import { fetchCustomerId } from '../service/LoginService.js';
import { detailKhachHang } from '../service/KhachHangService.js';
import { Route, Router, Routes } from "react-router";
import { AddressList } from "../address/AddressList.js";

export const ProfileUser = () => {

  const [khachHangId, setKhachHangId] = useState(null);

  const [customerData, setCustomerData] = useState({
    anh:'',
    email: '',
    hoTen: '',
    soDienThoai: '',
    ngaySinh:''
  });
  const [updatekhachHang, setUpdatekhachHang] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const handleUpdateProfile = (newKH) => {
    setUpdatekhachHang([...updatekhachHang, newKH]);
  };

  useEffect(() => {
    const getCustomerId = async () => {   
      const id = await fetchCustomerId();
      console.log("customerId:", id);
      if (id) {
        setKhachHangId(id);
      } else {
        alert("Không thể lấy ID khách hàng. Vui lòng thử lại.");
      }
    };
    getCustomerId();
  }, []);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await detailKhachHang(khachHangId);
        setCustomerData(response.data);
        // console.log(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (khachHangId) {
        fetchCustomerData();
      }
  }, [khachHangId,updatekhachHang]);

  return (
    <div className="profile-page">
      <Header />
      <div className="content-wrapper">
        <Sidebar data={customerData} />
        <Profile khachHangId={khachHangId} data={customerData} onUpdateProfile={handleUpdateProfile}/>
      </div>
    </div>
    // <Router>
    //   <div className="profile-page">
    //     <Header />
    //     <div className="content-wrapper">
    //       <Sidebar data={customerData} />
    //       <div className="main-content">
    //         <Routes>
    //           {/* Khi chọn Hồ sơ */}
    //           <Route path="/profile" element={<Profile khachHangId={khachHangId} data={customerData} onUpdateProfile={handleUpdateProfile} />} />
              
    //           {/* Khi chọn Địa chỉ */}
    //           <Route path="/addresslist" element={<AddressList />} />
    //         </Routes>
    //       </div>
    //     </div>
    //   </div>
    // </Router>
  );
};

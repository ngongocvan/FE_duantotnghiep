import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Tạo file CSS nếu bạn muốn thêm kiểu

const Sidebar = ({data}) => {

    const [customerData, setCustomerData] = useState({
        anh:'',
        hoTen: ''
      });

    useEffect(() => {
        // Kiểm tra nếu data đã thay đổi, cập nhật customerData
        if (data) {
            setCustomerData(data); // Cập nhật lại customerData
          }
      }, [data]);

  return (
    <div className="sidebar">
      <div className="profile-section">
        <div className="avatar">
          <img src={customerData.anh} alt="Avatar" />
        </div>
        <p>{customerData.hoTen}</p>
        {/* <button>Sửa Hồ Sơ</button> */}
      </div>
        <h5>Tài Khoản Của Tôi:</h5>
      <div className="menu">
        <ul>
          <li><Link to="/profile">Hồ Sơ</Link></li>
          <li><Link to="/addresslist">Địa Chỉ</Link></li>
          <li><Link to="/change-password">Đổi Mật Khẩu</Link></li>
        </ul>
      </div>

      <div className="footer">
        <ul>
          <li ><Link to="/OrderStatusPage">Đơn Mua</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

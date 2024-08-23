import React from "react";
import "./AddressList.css";  // Import file CSS cho component này

const addresses = [
  {
    name: "Phạm Đức Ngọc",
    phone: "+84 774 359 095",
    address: "Số Nhà 29, Ngõ 63/57 Đường Lê Đức Thọ, Thôn Phú Mỹ, Phường Mỹ Đình 2, Quận Nam Từ Liêm, Hà Nội",
    default: true,
  },
  {
    name: "Nguyễn Xuân Thắng",
    phone: "+84 968 516 991",
    address: "Khu 9, Xã Đan Thượng, Huyện Hạ Hòa, Phú Thọ",
    default: false,
  },
  {
    name: "Phạm Đức Ngọc",
    phone: "+84 774 359 095",
    address: "Xóm 8, Xã Như Hòa, Huyện Kim Sơn, Ninh Bình",
    default: false,
  },
  {
    name: "Phạm Thị Vân",
    phone: "+84 327 687 258",
    address: "Trường Đại Học Tdt, 19 Nguyễn Hữu Thọ, Phường Tân Phong, Quận 7, TP. Hồ Chí Minh",
    default: false,
  }
];

export const AddressList = () => {
  return (
    <div className="address-container">
      <div className="address">
        <h2>Địa chỉ của tôi</h2>
        <button className="add-button">+ Thêm địa chỉ mới</button>
      </div>
      <ul className="address-list">
        {addresses.map((item, index) => (
          <li key={index} className="address-item">
            <div className="address-info">
              <strong>{item.name}</strong> 
              <span>{item.phone}</span>
              <p>{item.address}</p>
              {item.default && <span className="default-tag">Mặc định</span>}
            </div>
            <div className="address-actions">
              <a href="#update">Cập nhật</a>
              {!item.default && <a href="#delete">Xóa</a>}
              {!item.default && (
                <button className="default-button">Thiết lập mặc định</button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};


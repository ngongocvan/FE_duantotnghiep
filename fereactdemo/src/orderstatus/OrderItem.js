// OrderItem.js
import React, { useState } from "react";
import './OrderStyle.css';
import { Link } from "react-router-dom";

const OrderItem = ({ order }) => {
  const returnPolicy= useState("15 ngày trả hàng Trả hàng miễn phí 15 ngày")
  const handlePay = () => {
    console.log(`Thanh toán đơn hàng ${order.ma}`);
  };

  const handleTrack = () => {
    console.log(`Theo dõi đơn hàng ${order.ma}`);
  };

  const OrderCard = ({ product }) => {
    return (
      <div className="order-body">
    <img className="product-image" src={product.giayChiTiet.giay.anhGiay.tenUrl} alt={product.name} />
    <div className="product-info">
      <p className="product-name">{product.giayChiTiet.giay.ten}</p>
      <p className="product-category">Phân loại hàng: {product.giayChiTiet.giay.mauSac.ten}, {product.giayChiTiet.giay.kichCo.ten}</p>
      <p className="product-quantity">Số Lượng: x{product.soLuong}</p>
      <p className="return-policy">{returnPolicy}</p>
    </div>
    <div className="product-price">
      <p className="old-price">₫{product.giaNhap}</p>
      <p className="new-price">₫{product.donGia}</p>
    </div>
  </div>
    );
  };

  
  return (
    <div className="order-item">
  <div className="order-header">
    <button className="favorite-btn">Yêu thích</button>
    <span className="shop-name">Five Start</span>
    <span className="shop-name"><h4>Mã Hóa Đơn: #{order.ma}</h4></span>
    <button className="chat-btn">Chat</button>
    <button className="view-shop-btn"><Link to={"/home"}>Xem Shop</Link></button>
    <span className="order-status">
    {order.trangThai.toLocaleString() === "0" && "Chờ Thanh Toán"}
    {order.trangThai.toLocaleString() === "1" && "Vận Chuyển"}
    {order.trangThai.toLocaleString() === "2" && "Chờ Giao Hàng"}
    {order.trangThai.toLocaleString() === "3" && "Hoàn Thành"}
    {order.trangThai.toLocaleString() === "4" && "Đã Hủy"}
    {order.trangThai.toLocaleString() === "5" && "Trả Hàng"}
    {order.trangThai.toLocaleString() === "6" && "Hoàn Tiền"}
    </span>
  </div>

  {order.items.map((product, index) => (
  <React.Fragment key={index}>
    <OrderCard product={product} />
    {index < order.items.length - 1 && <hr className="product-divider" />}
  </React.Fragment>
))}


  <div className="order-footer">
    <span className="order-total">Thành tiền: ₫{order.tongTien.toLocaleString()}</span>
    <div className="order-actions">
      <button className="contact-seller-btn">Liên Hệ Người Bán</button>
      <button className="cancel-order-btn">Hủy Đơn Hàng</button>
      
      {/* {order.trangThai.toLocaleString() === "0" && <button onClick={handlePay}>Thanh Toán</button>}
      {order.trangThai.toLocaleString() === "1" && <button onClick={handleTrack}>Theo Dõi</button>} */}

    </div>
  </div>
</div>
  );
};

export default OrderItem;

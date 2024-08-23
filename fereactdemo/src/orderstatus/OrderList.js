// OrderList.js
import React, { useEffect, useState } from "react";
import OrderItem from "./OrderItem";
import {getHoaDonByKhachHangId } from "../service/HoaDonService.js"
import { fetchCustomerId } from '../service/LoginService.js';
import './OrderStyle.css';

const OrderList = ({ status }) => {
  const [khachHangId, setKhachHangId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const orders = [
  //   // Danh sách đơn hàng mẫu
  //   { id: 1, status: "pending", total: 300000, items: [{
  //           name: 'Áo khoác chống nắng Nam BL Fashion cổ cao túi khoá kéo,chất liệu vải kim cương thun thoáng khí',
  //           category: 'xám nhạt',
  //           size: 'L (45-64kg)',
  //           quantity: 1,
  //           returnPolicy: '15 ngày trả hàng\nTrả hàng miễn phí 15 ngày',
  //           oldPrice: 140000,
  //           newPrice: 55000,
  //         }, "Sản phẩm B"] },
  //   { id: 2, status: "shipping", total: 500000, items: ["Sản phẩm C"] },
  //   { id: 3, status: "completed", total: 200000, items: ["Sản phẩm D"] },
  //   // Thêm nhiều đơn hàng tùy ý
  // ];

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
    // Hàm gọi API để lấy hóa đơn
    const fetchInvoices = async () => {
      try {
        const response = await getHoaDonByKhachHangId(khachHangId);
        console.log(response.data);
        setOrders(response.data); // Giả sử API trả về danh sách hóa đơn
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    // Kiểm tra xem có `customerId` hay không trước khi gọi API
    if (khachHangId) {
      fetchInvoices();
    }
  }, [khachHangId]); // Chạy lại useEffect khi customerId thay đổi


  // Lọc các đơn hàng theo trạng thái
  const filteredOrders =
    status === "all" ? orders : orders.filter((order) => order.trangThai.toLocaleString() === status);

  return (
    <div className="order-list">
      {filteredOrders.length > 0 ? (
        filteredOrders.map((order) => <OrderItem key={order.id} order={order} />)
      ) : (
        <p>Không có đơn hàng nào.</p>
      )}
    </div>
  );
};

export default OrderList;

import React from "react";
import "./bill.css";
import { Header } from "../header/Header";
export const Bill = () => {
  return (
    <div className="bill_container">
      <Header />
      <div className="bill_left">
        <div className="left">
          <h3>Thông tin nhận hàng</h3>
          <div className="section">
            <div className="section_item">
              <input name="email" id="email" type="email" placeholder="Email" />
            </div>

            <div className="section_item">
              <input
                name="email"
                id="email"
                type="text"
                placeholder="Họ và tên"
              />
            </div>

            <div className="section_item">
              <input
                name="email"
                id="email"
                type="select"
                placeholder="Số điện thoại (tùy chọn)"
              />
            </div>

            <div className="section_item">
              <input
                name="email"
                id="email"
                type="email"
                placeholder="Tỉnh thành"
              />
            </div>

            <div className="section_item">
              <input
                name="email"
                id="email"
                type="email"
                placeholder="Quận Huyện"
              />
            </div>

            <div className="section_item">
              <input
                name="email"
                id="email"
                type="email"
                placeholder="Phường Xã"
              />
            </div>
            <div className="section_item">
              <input
                name="email"
                id="email"
                type="email"
                placeholder="Ghi chú(tùy chọn)"
              />
            </div>
          </div>
        </div>
        <div className="right">
          <div className="ship">
              <h3>Phí Vận Chuyển</h3>
              <input type="text" />
          </div>
          <h3>Thanh Toán</h3>
          <div className="right_cod">
            <div className="cod_item">
              <input type="radio" name="" id="" />
              Chuyển khoản
            </div>
            <div className="cod_item">
              <input type="radio" name="" id="" />
              Thu hộ (COD)
            </div>
          </div>
          <button>Đặt Hàng</button>
        </div>
      </div>
    </div>
  );
};

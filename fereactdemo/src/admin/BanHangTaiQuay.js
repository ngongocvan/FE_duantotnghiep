import React from "react";
import "./banhangtaiquay.css";
import { useState } from "react";
import { Input } from "antd";
const BanHangTaiQuay = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [customerMoney, setCustomerMoney] = useState("");
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleInputChange = (event) => {
    setCustomerMoney(event.target.value);
  };

  return (
    <div className="quay_container">
      {/* ben trai */}
      <div className="left"></div>

      {/* ben phai */}
      <div className="right">
        <p>Tiền khách phải trả</p>
        Tiền khách đưa
        <Input
          type="number"
          value={customerMoney}
          onChange={handleInputChange}
          placeholder="Nhập số tiền khách đưa"
        />
        <hr />
        <p>Tiền thừa</p>
        <hr />
        <div className="check_tt">
          <label>
            <input
              type="checkbox"
              value="option1"
              checked={selectedOption === "option1"}
              onChange={handleChange}
            />
            Tiền mặt
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              value="option2"
              checked={selectedOption === "option2"}
              onChange={handleChange}
            />
            Thẻ
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              value="option3"
              checked={selectedOption === "option3"}
              onChange={handleChange}
            />
            Chuyển Khoản
          </label>
        </div>
        <p style={{ paddingTop: "300px" }}>Tổng Tiền</p>
        <button className="btn-tt">Thanh Toán</button>
      </div>
    </div>
  );
};

export default BanHangTaiQuay;

import React, { useState } from "react";
import "./cart.css";
import { Header } from "../header/Header";

export const Cart = () => {
  // Lưu trữ thông tin sản phẩm trong một mảng
  const [products, setProducts] = useState([
    { name: "Addidas", price: 200000, count: 1, img: "./anhgiay/anh1.jpg" },
    { name: "Nike", price: 300000, count: 1, img: "./anhgiay/anh2.jpg" },
    { name: "Nike", price: 300000, count: 1, img: "./anhgiay/anh2.jpg" },
  ]);

  // Hàm tăng số lượng
  const increment = (index) => {
    const newProducts = [...products];
    newProducts[index].count += 1;
    setProducts(newProducts);
  };

  // Hàm giảm số lượng
  const decrement = (index) => {
    const newProducts = [...products];
    if (newProducts[index].count > 1) {
      newProducts[index].count -= 1;
      setProducts(newProducts);
    }
  };

  // Tính tổng giá trị của tất cả các sản phẩm
  const totalAmount = products.reduce(
    (total, product) => total + product.price * product.count,
    0
  );

  return (
    <div>
      <Header />
      <div className="container_cart">
        <div className="cart">
          <div className="cart_content">
            <p>Thông tin sản phẩm</p>
            <p>Đơn giá</p>
            <p>Số lượng</p>
            <p>Thành tiền</p>
          </div>
          {products.map((product, index) => (
            <div className="prouduct_cart" key={index}>
              <div className="prouduct_cart_name">
                <img src={product.img} alt={product.name} />
                <div style={{ marginTop: "20px" }}>
                  <p>{product.name}</p>
                  <button>Xóa</button>
                </div>
              </div>
              <div className="prouduct_cart_price">
                <p>{product.price.toLocaleString()}đ</p>
              </div>
              <div className="prouduct_cart_count">
                <div className="prouduct_cart_count_count">
                  <button onClick={() => decrement(index)}>-</button>
                  <p>{product.count}</p>
                  <button onClick={() => increment(index)}>+</button>
                </div>
              </div>
              <div className="prouduct_cart_discount">
                <p>{(product.price * product.count).toLocaleString()}đ</p>
              </div>
            </div>
          ))}
          <div className="total">
            <div className="total_value">
              <div className="total_value_total">
                Tổng tiền : <p>{totalAmount.toLocaleString()}đ </p>
              </div>

              <button>Thanh toán</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

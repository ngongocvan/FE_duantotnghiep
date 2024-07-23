import React from "react";
import { Header } from "../header/Header";
import axios from "axios";
import "./productall.css";
import { Product } from "../product/Product";
import { useState, useEffect } from "react";

export const ProductAll = () => {
  const list_product = [
    {
      imgSrc: "../anhgiay/anh1.jpg",
      description: "Demo sản phẩm thuộc tính 1",
      price: "50.000",
      buttonText: "Thêm vào giỏ hàng",
      saleText: "Sale",
    },
    {
      imgSrc: "../anhgiay/anh2.jpg",
      altText: "Sản phẩm 2",
      description: "Demo sản phẩm thuộc tính 2",
      price: "500.000",
      buttonText: "Thêm vào giỏ hàng",
      saleText: "Sale",
    },
    {
      imgSrc: "../anhgiay/anh3.jpg",
      altText: "Sản phẩm 2",
      description: "Demo sản phẩm thuộc tính 2",
      price: "500.000",
      buttonText: "Thêm vào giỏ hàng",
      saleText: "Sale",
    },
    {
      imgSrc: "../anhgiay/anh4.jpg",
      altText: "Sản phẩm 2",
      description: "Demo sản phẩm thuộc tính 2",
      price: "500.000",
      buttonText: "Thêm vào giỏ hàng",
      saleText: "Sale",
    },
    {
      imgSrc: "../anhgiay/anh5.jpg",
      altText: "Sản phẩm 2",
      description: "Demo sản phẩm thuộc tính 2",
      price: "500.000",
      buttonText: "Thêm vào giỏ hàng",
      saleText: "Sale",
    },
    {
      imgSrc: "../anhgiay/anh5.jpg",
      altText: "Sản phẩm 2",
      description: "Demo sản phẩm thuộc tính 2",
      price: "500.000",
      buttonText: "Thêm vào giỏ hàng",
      saleText: "Sale",
    },
    {
      imgSrc: "../anhgiay/anh5.jpg",
      altText: "Sản phẩm 2",
      description: "Demo sản phẩm thuộc tính 2",
      price: "500.000",
      buttonText: "Thêm vào giỏ hàng",
      saleText: "Sale",
    },
    {
      imgSrc: "../anhgiay/anh5.jpg",
      altText: "Sản phẩm 2",
      description: "Demo sản phẩm thuộc tính 2",
      price: "500.000",
      buttonText: "Thêm vào giỏ hàng",
      saleText: "Sale",
    },
   
    
  ];

  return (
    <div className="productAll_container">
      <Header />
      <div className="banner_productAll">
        <img src="banner_3.jpg" alt="" />
      </div>
      <div className="aside_container">
        <div className="aside_left">
          {/* danh muc san phẩm */}
          <div className="product-portfolio">
            <div
              className="background"
              style={{
                color: "black",
                fontSize: "25px",
                fontWeight: "500",
                paddingLeft: "20px",
              }}
            >
              <p
                style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  marginTop: "10px",
                }}
              >
                Danh mục sản phẩm
              </p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "27px",
                marginLeft: "20px",
                marginTop: "20px",
              }}
            >
              <div>
                <p>giay the thao</p>
              </div>
              <div>
                <p>giay the thao</p>
              </div>
              <div>
                <p>giay the thao</p>
              </div>
              <div>
                <p>giay the thao</p>
              </div>
              <div>
                <p>giay the thao</p>
              </div>
              <div>
                <p>giay the thao</p>
              </div>
            </div>
          </div>
          {/* bộ lọc sản phẩm */}
          <div className="product-portfolio" style={{ marginTop: "30px" }}>
            <div
              className="background"
              style={{
                color: "black",
                fontSize: "25px",
                fontWeight: "500",
                paddingLeft: "20px",
              }}
            >
              <p>Bộ lọc sản phẩm</p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "27px",
                marginLeft: "20px",
              }}
            >
              <p
                style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  marginTop: "10px",
                }}
              >
                Chọn mức giá
              </p>

              <div>
                <input type="checkbox" name="" id="" />
                Từ 100k - 200k
              </div>
              <div>
                <input type="checkbox" name="" id="" />
                Từ 300k - 500k
              </div>
              <div>
                <input type="checkbox" name="" id="" />
                Từ 500k - 1 triệu
              </div>
              <div>
                <input type="checkbox" name="" id="" />
                Từ 1 triệu - 2 triệu
              </div>
              <div>
                <input type="checkbox" name="" id="" />
                Từ 1,5 triệu - 3 triệu
              </div>
              <div>
                <input type="checkbox" name="" id="" />
                Từ 3 triệu - 4 triệu
              </div>
              <div>
                <input type="checkbox" name="" id="" />
                Từ 4 triệu - 5 triệu
              </div>
            </div>
          </div>
        </div>

        {/* phần hiển thị sản phẩm */}
        <div className="aside_right">
          <div className="aside_right_content">
            <img src="icongiay.jpg" alt="" />
            <div style={{ marginLeft: "20px" }}>
              <p>Tất cả sản phẩm</p>
              <span>
                Chúng tôi luôn cam kết mang đến những sản phẩm chất lượng cao,
                được chọn lọc kỹ lưỡng từ các nhà sản xuất uy tín trên thế giới.
                Qua sự kết hợp giữa chất lượng và sự đa dạng, Dola Tool mang đến
                cho khách hàng lựa chọn tối ưu cho các công việc cơ khí của
                mình.
              </span>
            </div>
          </div>
          <div className="sort">
            <img src="sapxep.png" alt="" />
            <p>Sắp xếp theo:</p>
            <button>Tên A-Z</button>
            <button>Tên Z-A</button>
            <button>Hàng Mới</button>
            <button>Giá thấp đến cao</button>
            <button>Giá cao đến thâp</button>
          </div>

          {/* không gian hiển thị sản phẩm */}
          <div className="show_product">
            {list_product.map((product, index) => (
              <Product
                key={index}
                imgSrc={product.imgSrc}
                altText={product.altText}
                description={product.description}
                price={product.price}
                buttonText={product.buttonText}
                saleText={product.saleText}
              />
            ))}
            
          </div>
          {/* Phân trang */}
        </div>
      </div>
      {/* <Footer /> */}
      {/* <Footer /> */}
    </div>
  );
};

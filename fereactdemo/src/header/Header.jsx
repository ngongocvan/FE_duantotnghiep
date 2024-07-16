import React from "react";
import "./header.css";
import { Link } from "react-router-dom";
export const Header = () => {
  return (
    <div className="header">
      <div className="header_content background">
        <div className="header_content_left">
          <p>Rất nhiều ưu đãi đang chờ bạn</p>
        </div>
        <div className="header_content_right">
          <div className="item">Đăng nhập</div>
          <div className="separator">|</div>
          <div className="item">Đăng ký</div>
          <div className="separator">|</div>
          <div className="item">Hotline : 19001010</div>
        </div>
      </div>
      <div className="header_header">
        <div className="header_header_left">
          <img src="../home/fivestar.png" alt="" />
          <input type="text" placeholder="Tìm kiếm..." />
        </div>
        <div className="header_header_right">
          <div className="header_header_right_content">
            <img src="../home/images.png" alt="" />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <p>
                <Link>So sánh</Link>
              </p>
              <p>0 sản phẩm</p>
            </div>
          </div>
          <div className="header_header_right_content">
            <img src="../home/images.png" alt="" />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <p>
                <Link>Yêu thích</Link>
              </p>
              <p>0 sản phẩm</p>
            </div>
          </div>
          <div className="header_header_right_content">
            <img src="../home/images.png" alt="" />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <p>
                <Link to={"/cart"}>Giỏ Hàng</Link>
              </p>
              <p>0 sản phẩm</p>
            </div>
          </div>
        </div>
      </div>
      {/* danh mục sản phẩm */}
      <div className="header_menu background">
        <div className="header_menu_left">
          <p>Danh Mục Sản Phẩm</p>
        </div>
        <div className="header_menu_right">
          <p>
            {" "}
            <Link to={"/home"}>Trang chủ</Link>
          </p>
          <p>
            <Link to={"/productAll"}>Sản phẩm</Link>
          </p>
          <p>Giới Thiệu</p>
          <p>Sản phẩm khuyến mãi</p>
          <p>Tin tức</p>
          <p>Liên Hệ</p>
          <p>Hệ Thống Cửa Hàng</p>
          <p>Câu Hỏi Thường Gặp</p>
        </div>
      </div>
    </div>
  );
};

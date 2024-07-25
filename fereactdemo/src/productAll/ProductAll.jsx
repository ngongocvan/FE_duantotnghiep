import React, { useState, useEffect, useContext } from "react";
import { Header } from "../header/Header";
import { getGiay } from "../service/GiayService";
import "./productall.css";
import { CartContext } from "../cart/CartContext";

export const ProductAll = () => {
  const [giay, setGiay] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    getAllGiay();
  }, []);

  const getAllGiay = async () => {
    const result = await getGiay();
    const dataGiay = result.data.map((item, index) => ({
      key: index,
      ID: item.id,
      MA: item.ma,
      TEN: item.ten,
      MOTA: item.moTa,
      GIANHAP: item.giaNhap,
      GIABAN: item.giaBan,
      GIASAUKHUYENMAI: item.giaSauKhuyenMai,
      ANH_GIAY: item.anhGiay ? item.anhGiay.tenUrl : null,
    }));
    setGiay(dataGiay);
  };

  return (
    <div className="productAll_container">
      <Header />
      <div className="banner_productAll">
        <img src="banner_3.jpg" alt="" />
      </div>
      <div className="aside_container">
        <div className="aside_left">
          {/* Danh mục sản phẩm */}
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
                <p>giày thể thao</p>
              </div>
              <div>
                <p>giày thể thao</p>
              </div>
              <div>
                <p>giày thể thao</p>
              </div>
              <div>
                <p>giày thể thao</p>
              </div>
              <div>
                <p>giày thể thao</p>
              </div>
              <div>
                <p>giày thể thao</p>
              </div>
            </div>
          </div>
          {/* Bộ lọc sản phẩm */}
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

        {/* Phần hiển thị sản phẩm */}
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
            <button>Giá cao đến thấp</button>
          </div>

          {/* Không gian hiển thị sản phẩm */}
          <div className="show_product">
            {giay.map((item) => (
              <div key={item.key} className="product">
                <img
                  src={`http://localhost:2003/upload/${item.ANH_GIAY}`}
                  alt={item.TEN}
                  style={{ maxWidth: "100px" }}
                />
                <h2>{item.TEN}</h2>
                <p>{item.GIABAN} VND</p>
                <button
                  onClick={() => addToCart({ ...item, price: item.GIABAN })}
                >
                  Thêm
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

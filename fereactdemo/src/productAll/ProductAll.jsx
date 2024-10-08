import React, { useState, useEffect, useContext } from "react";
import { Header } from "../header/Header";
import { getGiay } from "../service/GiayService";
import "./productall.css";
// import { CartContext } from "../cart/CartContext";
import { useNavigate } from "react-router-dom";
import { getAllGiayChiTiet } from "../service/GiayChiTietService";
import useCart from "../components/Cart";
import { getMauSac } from "../service/MauSacService";
import { getSizes } from "../service/KichCoService";

export const ProductAll = () => {
  const [giay, setGiay] = useState([]);
  const [giayChiTiet, setGiayChiTiet] = useState([]);
  const [filteredGiay, setFilteredGiay] = useState([]);
  const [priceRange, setPriceRange] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  // const { addToCart } = useContext(CartContext);
  const { addToCart } = useCart();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterAndSortGiay();
  }, [selectedColors, selectedSizes, priceRange, giay, sortOrder]);

  const fetchData = async () => {
    const resultGiay = await getGiay();
    const resultGiayChiTiet = await getAllGiayChiTiet();

    const dataGiay = resultGiay.data.map((item) => ({
      ID: item.id,
      MA: item.ma,
      TEN: item.ten,
      MOTA: item.moTa,
      GIANHAP: item.giaNhap,
      GIABAN: item.giaBan,
      GIASAUKHUYENMAI: item.giaSauKhuyenMai,
      ANH_GIAY: item.anhGiay ? item.anhGiay.tenUrl : null,
      MAU_SAC: item.mauSac ? item.mauSac.ten : null,
      KICH_CO: item.kichCo ? item.kichCo.ten : null,
      // Gán giá trị mặc định cho soLuongTon
      soLuongTon: 0,
    }));
    console.log(dataGiay);

    const dataGiayChiTiet = resultGiayChiTiet.data;

    // Kết hợp dữ liệu giữa giay và giayChiTiet
    const combinedData = dataGiay.map((giayItem) => {
      const matchingGiayChiTiet = dataGiayChiTiet.find(
        (chiTietItem) => chiTietItem.giay && chiTietItem.giay.id === giayItem.ID
      );
      return {
        ...giayItem,
        soLuongTon: matchingGiayChiTiet ? matchingGiayChiTiet.soLuongTon : 0,
      };
    });

    setGiay(combinedData);
    setFilteredGiay(combinedData); // Khởi tạo filteredGiay với dữ liệu đã kết hợp
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredGiay.slice(indexOfFirstItem, indexOfLastItem);

  const handlePriceRangeChange = (event) => {
    const value = event.target.value;
    setPriceRange((prevRanges) =>
      prevRanges.includes(value)
        ? prevRanges.filter((range) => range !== value)
        : [...prevRanges, value]
    );
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };
  const handleSizeChange = (event) => {
    const value = event.target.value;
    setSelectedSizes((prevSizes) =>
      prevSizes.includes(value)
        ? prevSizes.filter((size) => size !== value)
        : [...prevSizes, value]
    );
  };
  const handleColorChange = (event) => {
    const value = event.target.value;
    setSelectedColors((prevColors) =>
      prevColors.includes(value)
        ? prevColors.filter((color) => color !== value)
        : [...prevColors, value]
    );
  };

  const filterAndSortGiay = () => {
    let filtered = giay;

    // Lọc theo mức giá
    if (priceRange.length > 0) {
      filtered = filtered.filter((item) => {
        const price = item.GIABAN;
        return priceRange.some((range) => {
          const [min, max] = range.split("-").map(Number);
          return price >= min && price <= max;
        });
      });
    }
    // Lọc theo màu sắc
    if (selectedColors.length > 0) {
      filtered = filtered.filter((item) =>
        selectedColors.includes(item.MAU_SAC)
      );
    }

    // Lọc theo kích cỡ
    if (selectedSizes.length > 0) {
      filtered = filtered.filter((item) =>
        selectedSizes.some(
          (size) => item.KICH_CO && item.KICH_CO.includes(size)
        )
      );
    }

    // Sắp xếp theo thứ tự
    filtered = filtered.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.GIABAN - b.GIABAN;
      } else {
        return b.GIABAN - a.GIABAN;
      }
    });

    setFilteredGiay(filtered);
  };

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredGiay.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="pagination">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            className={`page-number ${number === currentPage ? "active" : ""}`}
          >
            {number}
          </button>
        ))}
      </div>
    );
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
            {/* lọc theo kích cỡ */}
            <div className="size">
              <p>Chọn kích cỡ</p>
              <div>
                <input type="checkbox" value="36" onChange={handleSizeChange} />{" "}
                36
              </div>
              <div>
                <input type="checkbox" value="37" onChange={handleSizeChange} />{" "}
                37
              </div>
              <div>
                <input type="checkbox" value="38" onChange={handleSizeChange} />{" "}
                38
              </div>
              <div>
                <input type="checkbox" value="39" onChange={handleSizeChange} />{" "}
                39
              </div>
              <div>
                <input type="checkbox" value="40" onChange={handleSizeChange} />{" "}
                40
              </div>
            </div>
            {/* lọc theo màu sắc */}
            <div className="size">
              <p>Chọn màu sắc</p>
              <div>
                <input
                  type="checkbox"
                  value="Đỏ"
                  onChange={handleColorChange}
                />{" "}
                Đỏ
              </div>
              <div>
                <input
                  type="checkbox"
                  value="Đen"
                  onChange={handleColorChange}
                />{" "}
                Đen
              </div>
              <div>
                <input
                  type="checkbox"
                  value="Vàng"
                  onChange={handleColorChange}
                />{" "}
                Vàng
              </div>
              <div>
                <input
                  type="checkbox"
                  value="Xanh"
                  onChange={handleColorChange}
                />{" "}
                Xanh
              </div>
              <div>
                <input
                  type="checkbox"
                  value="Trắng"
                  onChange={handleColorChange}
                />{" "}
                Trắng
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "2px",
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
                <input
                  type="checkbox"
                  value="100000-200000"
                  onChange={handlePriceRangeChange}
                />
                Từ 100k - 200k
              </div>
              <div>
                <input
                  type="checkbox"
                  value="300000-500000"
                  onChange={handlePriceRangeChange}
                />
                Từ 300k - 500k
              </div>
              <div>
                <input
                  type="checkbox"
                  value="500000-1000000"
                  onChange={handlePriceRangeChange}
                />
                Từ 500k - 1 triệu
              </div>
              <div>
                <input
                  type="checkbox"
                  value="1000000-2000000"
                  onChange={handlePriceRangeChange}
                />
                Từ 1 triệu - 2 triệu
              </div>
              <div>
                <input
                  type="checkbox"
                  value="1500000-3000000"
                  onChange={handlePriceRangeChange}
                />
                Từ 1,5 triệu - 3 triệu
              </div>
              <div>
                <input
                  type="checkbox"
                  value="3000000-4000000"
                  onChange={handlePriceRangeChange}
                />
                Từ 3 triệu - 4 triệu
              </div>
            </div>
          </div>
        </div>

        <div className="aside_right">
          <div className="all_products">
            <div className="products_container">
              {currentItems.map((item, index) => (
                <div
                  className="product"
                  key={index}
                  onClick={() => navigate(`/product-detail/${item.ID}`)} //}
                >
                  <img
                    src={item.ANH_GIAY || "default_image.jpg"}
                    alt="product"
                    className="product_image"
                  />
                  <h3 className="product_name">{item.TEN}</h3>
                  <p className="product_price">
                    {item.GIABAN.toLocaleString()} VND
                  </p>
                  <p className="product_stock">Số lượng: {item.soLuongTon}</p>
                  <button
                    className="add_to_cart_button"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart({ ...item, giayId: item.ID });
                    }}
                  >
                    Thêm vào giỏ hàng
                  </button>
                </div>
              ))}
            </div>
            {renderPagination()}
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getGiayDetail } from "../service/GiayService";
import { CartContext } from "../cart/CartContext";
import "./sanphamchitiet.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate(); // Hook để điều hướng

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await getGiayDetail(id);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product detail:", error);
      }
    };

    fetchProductDetail();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    navigate("/cart"); // Điều hướng đến trang giỏ hàng sau khi thêm sản phẩm
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-detail">
      <div className="detail_img">
        <img
          src={`http://localhost:2003/upload/${product.anhGiay.tenUrl}`}
          alt={product.ten}
        />
      </div>
      <div className="detail_content">
        <h2>{product.ten}</h2>
        <p>{product.moTa}</p>
        <p>Giá: {product.giaBan.toLocaleString()} VND</p>
        <p>
          Giá sau khuyến mãi: {product.giaSauKhuyenMai.toLocaleString()} VND
        </p>
        <button
          className="add_to_cart_button"
          onClick={handleAddToCart} // Sử dụng hàm handleAddToCart
        >
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;

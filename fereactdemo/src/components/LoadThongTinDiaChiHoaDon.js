import React, { useState, useEffect } from 'react';
import { getDiaChiByKhachHangId } from '../service/DiaChiService.js';
// import { Link } from "react-router-dom";
import AddressModal from '../address/AddressModal.js'; // Đường dẫn tới file AddressModal.js

const DataCustomerInfo = ({ customerId, onDiaChiChange }) => {
  // const navigate = useNavigate();
  const [customerData, setCustomerData] = useState([]);
  const [diaChiCuThe, setDiaChiCuThe] = useState("");
  const [xa, setXa] = useState("");
  const [huyen, setHuyen] = useState("");
  const [tinh, setTinh] = useState("");
  const [ghiChu, setghiChu] = useState("");

  const [diaChiList, setDiaChiList] = useState([]);

  const handleAddAddress = (newAddress) => {
    setDiaChiList([...diaChiList, newAddress]);
  };

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const handleDiaChiChange = () => {
  //   navigate('/OrderStatusPage');
  // };

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await getDiaChiByKhachHangId(customerId);
        // Kiểm tra dữ liệu trả về
        // console.log(response.data+"aaaaaaaaaa");
        // Kiểm tra xem dữ liệu có phải là mảng không, nếu không thì đưa nó vào mảng
        const data = Array.isArray(response.data) ? response.data : [response.data];
        setCustomerData(data);
        if (data.length > 0) {
          setTinh(data[0].thanhPho);
          setHuyen(data[0].huyen);
          setXa(data[0].xa);
          setDiaChiCuThe(data[0].tenDiaChi);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, [customerId,diaChiList]);

  useEffect(() => {
    const data1 = {diaChi:`${diaChiCuThe},${xa},${huyen},${tinh}`, moTa:ghiChu};
    onDiaChiChange(data1);
    console.log(data1);
  }, [ghiChu,xa, huyen, tinh]);

    // Hàm xử lý thay đổi giá trị của input
    const handleChange = (event) => {
      setghiChu(event.target.value);
    };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {customerData.length > 0 ? (
        customerData.map((data, index) => (
          <div className="section" key={index}>
            <div className="section_item">
              <div><label htmlFor="thanhPho">Tỉnh/TP:</label></div>
              <div><input
                name="thanhPho"
                id="thanhPho"
                type="text"
                placeholder="Tỉnh thành"
                value={data.thanhPho || ""}
                readOnly
              /></div>             
            </div>
            <div className="section_item">
            <div><label htmlFor="huyen">Huyện/Quận:</label></div>
            <div><input
                name="huyen"
                id="huyen"
                type="text"
                placeholder="Quận Huyện"
                value={data.huyen || ""}
                readOnly
              /></div>
              
            </div>
            <div className="section_item">
            <div><label htmlFor="xa">Xã/Phường:</label></div>
            <div><input
                name="xa"
                id="xa"
                type="text"
                placeholder="Phường Xã"
                value={data.xa || ""}
                readOnly
              /></div>
              
            </div>
            <div className="section_item">
            <div><label htmlFor="xa">Địa Chỉ Cụ Thể:</label></div>
            
            <div><input
                name="diaChiCuThe"
                id="diaChiCuThe"
                type="text"
                placeholder="số nhà, đường, xóm, thôn,..."
                value={data.tenDiaChi||""} // Gán giá trị state cho input
                readOnly
                // onChange={handleChange} // Xử lý thay đổi dữ liệu
              /></div>
              
            </div>
            <div className="section_item">
            <div><label htmlFor="moTa">Ghi chú:</label></div>
            <div> <input
                name="moTa"
                id="moTa"
                type="text"
                placeholder="Ghi chú (tùy chọn)"
                value={ghiChu || ""}
                onChange={handleChange} // Xử lý thay đổi dữ liệu
              /></div>
             
            </div>
          </div>
        ))
      ) : (
        <div>
      <p>địa chỉ chưa được thiết lập</p>
      {/* Nút mở modal ở đây */}
      <AddressModal onAddAddress={handleAddAddress} />
    </div>
      )}
    </div>
  );
};

export default DataCustomerInfo;

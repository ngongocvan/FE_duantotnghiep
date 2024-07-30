import React, { useState } from 'react'
import CustomerInput from '../signln/CustomerInput'
import { Link, useNavigate } from 'react-router-dom'
import { signupCustomer } from '../service/RegisterService';

const Register = () => {
    const [formData, setFormData] = useState({
        hoTen: '',
        email: '',
        soDienThoai: '',
        matKhau: '',
        confirmPassword: ''
    });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.matKhau !== formData.confirmPassword) {
            alert("Passwords don't match");
            return;
        }
        try {
            const response = await signupCustomer({
                hoTen: formData.hoTen,
                email: formData.email,
                soDienThoai: formData.soDienThoai,
                matKhau: formData.matKhau
            });
            console.log(response.data);
            // Xử lý phản hồi từ server (ví dụ: chuyển hướng đến trang đăng nhập)
            navigate('/login');
        } catch (error) {
            console.error('Signup error:', error.response?.data || error.message);
            // Xử lý lỗi (ví dụ: hiển thị thông báo lỗi)
        }
    };
    return (
        <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
            <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
                <h3 className="text-center">Register</h3>
                <p className="text-center">Create an account to continue.</p>
                <form onSubmit={handleSubmit}>
                    <CustomerInput
                        type="text"
                        label="Full Name"
                        i_id="hoTen"
                        i_class=""
                        value={formData.hoTen}
                        onChange={handleInputChange}
                    />
                    <CustomerInput
                        type="email"
                        label="Email Address"
                        i_id="email"
                        i_class=""
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    <CustomerInput
                        type="tel"
                        label="Phone Number"
                        i_id="soDienThoai"
                        i_class=""
                        value={formData.soDienThoai}
                        onChange={handleInputChange}
                    />
                    <CustomerInput
                        type="password"
                        label="Password"
                        i_id="matKhau"
                        i_class=""
                        value={formData.matKhau}
                        onChange={handleInputChange}
                    />
                    <CustomerInput
                        type="password"
                        label="Confirm Password"
                        i_id="confirmPassword"
                        i_class=""
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                    />
                    <button
                        className="border-0 px-3 py-2 text-white fw-bold w-100 mt-3"
                        style={{ background: "#ffd333" }}
                        type="submit">
                        Register
                    </button>
                </form>
                <div className="mt-3 text-center">
                    <span>Already have an account? </span>
                    <Link
                        to="/login"
                        style={{ color: "#ffd333", textDecoration: "none" }}
                    >
                        Login
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Register
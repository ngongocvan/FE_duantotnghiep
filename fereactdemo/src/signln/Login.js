import React from 'react'
import { Link } from "react-router-dom"
import CustomerInput from '../signln/CustomerInput'
const Login = () => {
    return (
        <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
            <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
                <h3 className="text-center">Login</h3>
                <p className="text-center">Login to your account to continue.</p>
                <form action="">
                    <CustomerInput type="text" placeholder="Email Address" id='email' />
                    <CustomerInput type="password" placeholder="Password" id='pass' />
                    <Link
                        to="/"
                        className="border-0 px-3 py-2 text-white text-center fw-bold w-100"
                        style={{ background: "#ffd333" }}
                        type="submit">
                        Login
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default Login
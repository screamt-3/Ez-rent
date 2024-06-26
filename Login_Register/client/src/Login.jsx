import React from'react'
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";


function Login() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/login', {email, password})
        .then(result => {console.log(result)
            if(result.data === "Success")
               navigate('/home')
            else(console.log(result.data))
        })
        .catch(err => console.log(err))

    }


    return(
        <div className="d-flex justify-content-center align-items-center bg-blue-royal vh-100">
            <div className="bg-white p-3 rounded w-30 color-black">
                <h2 style={{ textAlign: 'center' }}>
                    Welcome to Ez-Rent<br />
                    Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                            className="form-control rounded-0"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">
                            <strong>Password</strong>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            className="form-control rounded-0"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-default border w-100 rounded-2 bg-blue color-white">
                        Login
                    </button>
                    </form>
                    <p>Already Have an Account?</p>
                    <Link to="/Register" className="btn btn-default border w-100 bg-blue color-white rounded-2 text-decoration-none">
                        Sign-Up
                    </Link>
                
            </div>
        </div>
    )
}

export default Login;
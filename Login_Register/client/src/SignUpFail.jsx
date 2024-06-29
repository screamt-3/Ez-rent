import React from 'react'
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import './color.css';

function SignUpFail() {
    return (
        <div className='bg-blue-royal'>
            <div style={{fontSize: '50px'}} className='d-flex justify-content-center bg-white color-red vh-50'>Oops Email Is Already In Use</div>
            <div className="d-flex justify-content-center align-items-center bg-blue-royal vh-100">
                <div className="bg-white p-3 rounded w-25">
                    <Link to="/Login" className="btn btn-default w-100 bg-blue-royal rounded-2 text-decoration-none color-white">
                        Login
                    </Link>
                    <Link to="/register" style={{ marginTop: "30px"}} className="btn btn-default w-100 bg-blue-royal rounded-2 text-decoration-none color-white">
                        Register
                    </Link>
                </div>
            </div>
        </div>

    )
}

export default SignUpFail;
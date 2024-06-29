import React from 'react'
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import './color.css';

function Home() {
    return (
        <div>
            <h1 className='color-blue-royal'>Welcome to Ez-Rent's Homepage</h1>
            <div>

            </div>
            <div style={{height: '200%'}} className="d-flex justify-content-end align-items-center bg-white vh-100">
                <div className="bg-blue-royal p-3 rounded w-25">
                    <Link to="/CreateRental" className="btn btn-default w-100 bg-white rounded-1 text-decoration-none color-blue-royal">
                        Add Rental
                    </Link>

                </div>
            </div>
        </div>

            )
}

export default Home;
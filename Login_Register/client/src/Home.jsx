import React from 'react'
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function Home() {
    return (
        <><h2>Welcome to Ez-Rent's Homepage</h2><div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <Link to="/CreateRental" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                    Add Rental
                </Link>

            </div>
        </div></>

            )
}

export default Home;
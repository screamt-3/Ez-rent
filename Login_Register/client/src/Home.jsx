import React from 'react'
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import './color.css';
import { SearchBar } from './SearchBar';

function Home() {
    return (
        <div className='bg-blue-royal'>
            <h1 className='d-flex justify-content-center'>
                Ez-Rent Homepage
            </h1>
            <div className='d-flex justify-content-center align-items-center'>
            <Link to="/CreateRental" className="btn btn-primary">
                Add Rental
            </Link>
            </div>
            <div>
                <SearchBar />
            </div>

        </div>

    )
}

export default Home;

import React from 'react'
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import './color.css';
import { SearchBar } from './SearchBar';
<<<<<<< HEAD
=======
import UserDetail from './UserDetail';
>>>>>>> b984aff (MS3)

function Home() {
    const [userId, setUserId] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        navigate(`/user/${userId}`)
    };

    useEffect(() => {
        axios.get(`http://localhost:3001/userid`,
            { withCredentials: true }
        ).then(response_userId => {
            setUserId(response_userId.data._id)
        })
            .catch(err => {
                console.error('Error fetching user:', err);
            });
    }, [userId])

    return (
        <div className='bg-blue-royal'>
            <h1 className='d-flex justify-content-center'>
                Ez-Rent Homepage
                <form onSubmit={handleSubmit}>
                    <button type="submit" className="btn btn-default border w-100 rounded-2 bg-blue color-white">
                        Info
                    </button>
                </form>
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

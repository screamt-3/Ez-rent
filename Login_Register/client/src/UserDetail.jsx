import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';

const UserDetail = () => {
    const [chats, setChats] = useState(null);
    const [rentals, setRentals] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3001/userInfo`,
            { withCredentials: true}
        )
            .then(response => {
                setUser(response.data.user)
                setRentals(response.data.rentals)
                setChats(response.data.chats)
            })
            .catch(err => {
                console.error('Error fetching user:', err);
            });
    }, []);

    if (!user) return <div>Loading...</div>;

    return (
        <div className='d-flex justify-content-front align-items-top bg-blue-royal vh-100'>
            <div className='rounded-2 justify-content-centre w-50'>
                <div className='rounded-2 bg-white border border-primary'>
                <div className='d-flex justify-content-start'>
                    <h2>Username: {user.name}</h2>
                </div>
                <div className='d-flex justify-content-start'>Email: {user.email}</div>
                </div>
                <div style={{ width: "100%", margin: "0 auto", minHeight: "70vh", }}
                className='bg-blue-royal'>
                    {rentals.map((rental) => (
                        <div key={rental._id} className="">
                            <Link to={`/rentals/${rental._id}`} className="btn my-3 p-3 border bg-white rounded-2 w-100">
                                <h3>Type: {rental.type}</h3>
                                <p>Location: {rental.location}</p>
                                <p>Number of Rooms: {rental.number_of_rooms}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <div className=''>
                <Link to="/CreateRental" className="btn btn-primary">
                    Add Rental
                </Link>
            </div>
            <div className=''>
                <Link to={`/user/chats`} className="btn btn-primary">
                    View Chats
                </Link>
            </div>
        </div>
    );
};

export default UserDetail;

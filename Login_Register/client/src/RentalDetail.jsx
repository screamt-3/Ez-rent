import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

const RentalDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [owner, setOwner] = useState(null);
    const [rental, setRental] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3001/rental/${id}`, 
            { withCredentials: true })
            .then(response => {
                setRental(response.data.rental);
                setOwner(response.data.owner)
            })
            .catch(err => {
                console.error('Error fetching rental or user:', err);
            });
    }, [id]);

    if (!rental || !owner) return <div>Loading...</div>;

    const handleContactClick = () => {
        axios.post(`http://localhost:3001/api/chat` ,
            { owner, rental },
            { withCredentials: true }
        ).then(res => navigate(`/chat/${res.data._id}`))
        .catch(err => console.log(err));
    };

    return (
        <div className='d-flex justify-content-front align-items-top bg-blue-royal vh-100'>
            <div className='rounded-2 justify-content-center w-50'>
                <div className='rounded-2 bg-white border border-primary'>
                    <h2>Type: {rental.type}</h2>
                    <p>Location: {rental.location}</p>
                    <p>Number of Rooms: {rental.number_of_rooms}</p>
                    <p>Owner: {owner.name}</p>
                    <p>Email: {owner.email}</p>
                    <button className="btn btn-primary" onClick={handleContactClick}>
                        Contact Owner
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RentalDetail;

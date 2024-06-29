import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const SearchBar = () => {
    const [input, setInput] = useState("")
    const [results, setResults] = useState([])

    //const navigate = useNavigate()


    const fetchData = (condition) => {
        axios.get('http://localhost:3001/rentals', {
            params: { condition }
        })
            .then(response => {
                setResults(response.data)
            })
            .catch(err => {
                console.log('Error in fetchData:', err);
            });
    }


    useEffect(() => {
        fetchData("");
    }, [])


    const handleChange = (value) => {
        setInput(value)
        fetchData(value)
    }

    return (
        <div>
            <div style={{ borderRadius: '100vh', borderColor: 'blue' }}
                className="d-flex justify-content-center align-items-center
        p-3 color-black bg-blue-royal">
                <FaSearch style={{ color: 'blue' }} id='search-icon' />
                <input
                    style={{ borderRadius: '10px', borderColor: "white" }}
                    placeholder="Type to search..."
                    value={input}
                    onChange={(e) => handleChange(e.target.value)}
                />
                <button className="btn btn-primary" onClick={() => fetchData(input)}>
                    Search
                </button>
            </div>
            <div style={{ width: "60%", margin: "0 auto", minHeight: "70vh"}}>
                {results.map((rental) => (
                        <div key={rental._id} className="my-3 p-3 border bg-white rounded-2">
                            <h3>Type: {rental.type}</h3>
                            <p>Location: {rental.location}</p>
                            <p>Number of Rooms: {rental.number_of_rooms}</p>
                        </div>
                ))}
            </div>

        </div>
    );
};

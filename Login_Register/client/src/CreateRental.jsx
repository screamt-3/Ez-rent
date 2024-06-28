import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";



function CreateRental() {
    const [type, setType] = useState()
    const [owner, setOwner] = useState()
    const [location, setLocation] = useState()
    const [number_of_rooms, setNumberOfRooms] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/CreateRental',{type, owner, location, number_of_rooms})
        .then(result => {console.log(result)
        navigate('/home')
        })
        .catch(err => console.log(err))

    }

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Rental Information</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="type">
                            <strong>Type</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. Condo, HDB"
                            autoComplete="off"
                            name="type"
                            className="form-control rounded-0"
                            onChange={(e) => setType(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="location">
                            <strong>Location</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. Orchard"
                            autoComplete="off"
                            name="type"
                            className="form-control rounded-0"
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="number_of_rooms">
                            <strong>Number of Rooms</strong>
                        </label>
                        <input
                            type="number"
                            placeholder="e.g. 3"
                            autoComplete="off"
                            name="number_of_rooms"
                            className="form-control rounded-0"
                            onChange={(e) => setNumberOfRooms(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Create Rental
                    </button>
                    </form>
                    <Link to="/home" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                        Back
                    </Link>
                
            </div>
        </div>
    );
}

export default CreateRental;
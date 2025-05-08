import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

const SingleCar = () => {
    const { id } = useParams() 
    const [car, setCar] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const response = await fetch(`/api/cars/all-cars/${id}`)
                if (!response.ok) {
                    throw new Error('Failed to fetch car details')
                }
                const data = await response.json()
                setCar(data)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        fetchCar()
    }, [id])

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>

    return (
        <div>
            <h1>Car Details</h1>
            {car && (
                <div style={{ border: '1px solid #ccc', padding: '20px', margin: '20px' }}>
                    <h2>{car.model}</h2>
                    <p><strong>Speed:</strong> {car.vitess} km/h</p>
                    <p><strong>Seats:</strong> {car.places}</p>
                    <p><strong>Price:</strong> ${car.price}</p>
                    <p><strong>Description:</strong> {car.description}</p>
                    <img 
                        src={car.image} 
                        alt={car.model} 
                        style={{ width: '300px', height: 'auto' }} 
                    />
                </div>
            )}
            <Link to="/">Back to Home</Link>
        </div>
    )
}

export default SingleCar
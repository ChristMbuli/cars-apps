import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const AddCar = () => {
    const [formData, setFormData] = useState({
        model: '',
        vitess: '',
        places: '',
        price: '',
        image: '',
        description: ''
    })
    const [message, setMessage] = useState(null) // État pour afficher le message

    // Function to handle input changes
    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const response = await fetch("http://localhost:8080/api/cars/add-car/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            const result = await response.json()
            setMessage({ type: 'success', text: 'Car added successfully!' }) // Message de succès
            setFormData({ // Réinitialiser les champs du formulaire
                model: '',
                vitess: '',
                places: '',
                price: '',
                image: '',
                description: ''
            })
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to add car. Please try again.' }) // Message d'erreur
            console.error('Error:', error)
        }
    }

    return (
        <div>
            <h1>Add a New Car</h1>
            <p>Fill in the details of the car you want to add.</p>
            <Link to={"/"}>View cars</Link>
            <br />
            <br />
            {/* Affichage du message */}
            {message && (
                <p style={{ color: message.type === 'success' ? 'green' : 'red' }}>
                    {message.text}
                </p>
            )}
            <form onSubmit={handleSubmit}>
                <label htmlFor="model">Model:</label>
                <input
                    type="text"
                    id="model"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="vitess">Speed:</label>
                <input
                    type="number"
                    id="vitess"
                    name="vitess"
                    value={formData.vitess}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="places">Seats:</label>
                <input
                    type="number"
                    id="places"
                    name="places"
                    value={formData.places}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="price">Price:</label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="image">Image URL:</label>
                <input
                    type="text"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                ></textarea>

                <button type="submit">Add Car</button>
            </form>
        </div>
    )
}

export default AddCar
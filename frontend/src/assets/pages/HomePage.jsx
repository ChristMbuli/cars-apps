import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCars = async () => {
    try {
      const response = await fetch("/api/cars/all-cars/");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCars(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCar = async (id) => {
    try {
      const response = await fetch(
        `/api/cars/delete-car/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete car");
      }
      // Supprime la voiture de la liste localement après suppression
      setCars(cars.filter((car) => car._id !== id));
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to delete car. Please try again.");
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the main page of the application.</p>
      <Link to={"/add-car"}>New Car</Link>
      <div>
        {cars.map((car) => (
          <div
            key={car._id}
            style={{
              border: "1px solid #ccc",
              margin: "10px",
              padding: "10px",
            }}
          >
            <h2>{car.model}</h2>
            <p>
              <strong>Speed:</strong> {car.vitess} km/h
            </p>
            <p>
              <strong>Seats:</strong> {car.places}
            </p>
            <p>
              <strong>Price:</strong> ${car.price}
            </p>
            <p>
              <strong>Description:</strong> {car.description}
            </p>
            <img
              src={`${car.image}`}
              alt={car.model}
              style={{ width: "200px", height: "auto" }}
            />
            <br />
            <br />

            <div style={{ display: "flex", textAlign: "center", gap: "10px" }}>
              <Link to={`/${car._id}`}>View Details</Link>
              <button onClick={() => deleteCar(car._id)}>Supprimer</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;

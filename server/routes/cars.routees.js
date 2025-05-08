import express from 'express';
import { createCar, deleteCar, getAllCars, getCarById, updateCar } from '../controllers/cars.controlleur.js';

const router = express.Router();

router.post("/add-car", createCar);
router.get("/all-cars",getAllCars )
router.get("/all-cars/:id", getCarById)
router.delete("/delete-car/:id", deleteCar);
router.patch("/update-car/:id", updateCar);




export default router;
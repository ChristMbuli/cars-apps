import Car from "../models/cars.model.js";
import mongoose from "mongoose";


export const createCar = async (req, res) => {
   const { model, vitess, places, price, image, description } = req.body;

   if (!model || !vitess || !places || !price || !image || !description) {
      return res.status(400).json({ message: "Veuillez remplir tous les champs" });
   }
   // Check if the price is a number
   if (isNaN(price)) {
      return res.status(400).json({ message: "Le prix doit être un nombre" });
   }
   try {
         // Check if the car already exists
         const existingCar = await Car.findOne({ model });
         if (existingCar) {
             return res.status(400).json({ message: "Cette voiture existe déjà" });
         }
         
         // Create a new car
        const newCar = new Car({
             model,
             vitess,
             places,
             price,
             image,
             description
        });
        await newCar.save();
        res.status(201).json({ message: "voiture ajoutée avec succès" });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

export const getAllCars = async (req, res) => {
   try {
      const cars = await Car.find().sort({ createdAt: -1 });
      res.status(200).json(cars);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

export const getCarById = async (req, res) => {
   const { id } = req.params;
   try {
      // Check if the ID is a valid ObjectId // 680621b4480a45253703d112
      if (!mongoose.Types.ObjectId.isValid(id)) {
         return res.status(400).json({ message: "ID invalide" });
      }
      const car = await Car.findById(id);
      if (!car) {
         return res.status(404).json({ message: "Car not found" });
      }
      res.status(200).json(car);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

export const deleteCar = async (req, res) => {
   const { id } = req.params;
   try {
      // Check if the ID is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
         return res.status(400).json({ message: "ID invalide" });
      }
      const car = await Car.findByIdAndDelete(id);
      if (!car) {
         return res.status(404).json({ message: "Car not found" });
      }
      res.status(200).json({ message: "Car deleted successfully" });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

export const updateCar = async (req, res) => {
   const { id } = req.params;
   const { model, vitess, places, price, image, description } = req.body;
   try {
      // Check if the ID is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
         return res.status(400).json({ message: "ID invalide" });
      }
      const car = await Car.findByIdAndUpdate(id, {
         model,
         vitess,
         places,
         price,
         image,
         description
      }, { new: true });
      if (!car) {
         return res.status(404).json({ message: "Car not found" });
      }
      res.status(200).json(car);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}


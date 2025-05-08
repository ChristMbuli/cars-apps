import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import carsRoutes from './routes/cars.routees.js';
import connectDB from './config/connetionDB.js';
import path from 'path';

dotenv.config()
const app = express();

app.use(express.json());

app.use(cors());


const __dirname = path.resolve();

connectDB()

app.use("/api/cars", carsRoutes)

// Fichiers statiques (frontend)
app.use(express.static(path.join(__dirname, "/frontend/dist")));

// Redirection pour les routes non gérées
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
}
);


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}
);



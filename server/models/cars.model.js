import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
    "model": {
        type: String,
        required: true
    },
    "vitess": {
        type: String,
        required: true
    },
   "places":{
        type: Number,
        required: true
    },
    "price": {
        type: Number,
        required: true
    },
    "image": {
        type: String,
        required: true
    },
    "description": {
        type: String,
        required: true
    },
   
   },{ timestamps: true });

const Car = mongoose.model('Car', carSchema);
export default Car;
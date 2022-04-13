const mongoose = require("mongoose");
const Schema = mongoose.Schema;



// Create Schema

const FoodItemSchema = new Schema({

    addon: {
        type: Array,
        required: true,
        default: []
    },
    email: {
        type: String,
        required: true
    },
    itemname: {
        type: String,
        integer: true,
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
        default: 0
    },
    tags: {
        type: Array,
        required: true,
        default: []
    },
    vnv: {
        type: String,
        enum: ["Veg", "Non-Veg"],
        required: true
    },
    vendor: {
        type: String,
        required: true
    },
    shop: {
        type: String,
        required: true
    }


        
    
});





module.exports = FoodItem = mongoose.model("FoodItem", FoodItemSchema);
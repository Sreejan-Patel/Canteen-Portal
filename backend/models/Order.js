const mongoose = require("mongoose");
const Schema = mongoose.Schema;



// Create Schema

const OrderSchema = new Schema({

    addon: {
        type: Array,
        required: true,
        default: []
    },
    emailBuyer: {
        type: String,
        required: true
    },
    emailVendor: {
        type: String,
        required: true
    },
    itemname: {
        type: String,
        integer: true,
        required: true
    },
    placedtime: {
        type: Date,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
        default: 0
    },
    shop: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["PLACED", "ACCEPTED", "COOKING" , "READY FOR PICKUP", "COMPLETED" ,"REJECTED"],
        required: true,
        default: "PLACED"
    },
    tags: {
        type: Array,
        required: true,
        default: []
    },
    vendor: {
        type: String,
        required: true
    },
    vnv: {
        type: String,
        enum: ["Veg", "Non-Veg"],
        required: true
    }



        
    
});




module.exports = Order = mongoose.model("Order", OrderSchema);
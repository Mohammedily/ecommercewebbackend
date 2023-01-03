const mongoose = require("mongoose");



const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    image_1:{
        type: String,
        required: true
    },
    image_2:{
        type: String,
        required: true
    },
    image_3:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    discount:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    adminId:{
        type: String,
        required: true 
    }
});

const product = new mongoose.model("products", productSchema);

module.exports = product;
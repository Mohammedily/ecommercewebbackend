const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
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
    discount:{
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    qty:{
        type: Number,
        required: true
    },
    size:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    adminId:{
        type: String,
        required: true 
    },
    clientId:{
        type: String,
        required: true 
    }
});

const cart = new mongoose.model("cart", cartSchema);

module.exports = cart;
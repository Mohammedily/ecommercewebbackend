const mongoose = require('mongoose');



const likeSchema = new mongoose.Schema({
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
    discount:{
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
    }
});

const like = new mongoose.model("like", likeSchema);

module.exports = like;
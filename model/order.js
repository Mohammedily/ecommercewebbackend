const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema({
    stripe_id: {
type: String,
required: true
    },
    name: {
type: String,
required: true
    },
    address: [{
    door_no:{
        type: String,
        required: true
    },
    street_name:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    },   
    pincode:{
        type: Number,
        required: true
    }}],
    product:[{
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
            type: String,
            required: true
        },
        qty:{
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
        },
        clientId:{
            type: String,
            required: true 
        }
    }],
    email:{
        type:String,
        required: true
    },
    source:{
        type:String,
        required: true
    },
    totalAmount:{
        type: String,
        required: true
    },
    Date:{
        type: String,
        required: true
    },
    status:{
      type: String,
      required: true
    },
    userId:{
        type: String,
        required: true
    }
}, {timestamps: true});


const order = new mongoose.model("order", orderSchema);

module.exports = order;
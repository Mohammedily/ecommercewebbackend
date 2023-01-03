const  mongoose = require("mongoose");

let adminSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type:String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});


const admin = new mongoose.model("admin", adminSchema);

module.exports = admin;
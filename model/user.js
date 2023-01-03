const  mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
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
    },
    resetLink:{
        data: String,
        default: ''
    }
}, {timestamps: true});


const user = new mongoose.model("user", userSchema);

module.exports = user;



<iframe width="853" height="480" src="https://www.youtube.com/embed/RmU2KH7YtIU" title="Surah Yaseen | Qari Tareq Mohammed | سورة يس | القارئ طارق محمد" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
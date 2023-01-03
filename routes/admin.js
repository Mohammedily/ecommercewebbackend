const express = require("express");
const admin = require("../model/admin");
const jwt = require("jsonwebtoken")
const adminrouter = express.Router();
const bcrypt = require("bcrypt");

adminrouter.post("/admin/signup", async(req, res) => {
    const { username, email, password }  = req.body;

    try {
        if(!username){
            return res.status(401).json({ message: "please enter username"});
        }
        if(!email){
            return res.status(401).json({ message: "please enter email"});
        }
        if(!password){
            return res.status(401).json({ message: "please enter password"});
        }

 
        let salt = await bcrypt.genSalt(Number(process.env.SALT));

        let hassedPassword = await bcrypt.hash(password, salt);
 
        let Admin = new admin({
            username, email, password: hassedPassword
        });


        try {
            await Admin.save();
        } catch (error) {
            return res.status(409).json({message: "signin error"});
        }

        return res.status(201).json({message: "Register Successfully"});

    } catch (error) {
        console.log(error);
    }

});

adminrouter.post("/admin/signin", async(req, res) => {
    const {email, password} = req.body;
  
    let existing;
    try {
        existing = await admin.findOne({email});
    } catch (error) {
        console.log(error);
    }

   if(!existing){
    return res.status(400).json({message: "Please Register, After Login"});
   }

   const comparePassword = await bcrypt.compareSync(password, existing.password);


   if(!comparePassword){
    return res.status(400).json({message: "Incorrect Password"});
   }

   const token = jwt.sign({_id: this._id}, process.env.JWTKEY,
    {
        "expiresIn":"1h"
    })

    return res.status(201).json({data: token, message: "Login Sucessfully",  existing});

});

adminrouter.get("/admin/sign/:id", async(req, res) => {
    
    const id = req.params.id;
    
    let data;
    try {
        data = await admin.findById(id);
    } catch (error) {
        console.log(error);
    }

    return res.status(200).json({admin: data});

})


module.exports = adminrouter;
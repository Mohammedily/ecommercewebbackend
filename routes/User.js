const express = require("express");
const user = require("../model/user");
const jwt = require("jsonwebtoken")
const userrouter = express.Router();
const bcrypt = require("bcrypt");
const sendEmail = require("../routes/Nodemailer");
const crypto = require("crypto");
const Token = require("../model/token");



userrouter.post("/signup", async(req, res) => {
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

        let existing;
    try {
        existing = await user.findOne({ email });
    } catch (error) {
        console.log(error);
    }

       if(existing){
        return res.status(409).json({message: "Email Already register, please login"});
       }


 
        let salt = await bcrypt.genSalt(Number(process.env.SALT));

        let hassedPassword = await bcrypt.hash(password, salt);
 
        let User = new user({
            username, email, password: hassedPassword
        });


        try {
            await User.save();
            console.log(User);
        } catch (error) {
             res.status(409).json({message: "signin error"});
               console.log(error);
        }

        return res.status(201).json({message: "Register Successfully"});

    } catch (error) {
        console.log(error);
    }

});

userrouter.post("/signin", async(req, res) => {
    const {email, password} = req.body;
  
    let existing;
    try {
        existing = await user.findOne({ email });
    } catch (error) {
        console.log(error);
    }

   if(!existing){
    return res.status(409).json({message: "Please Register, After Login"});
   }

   const comparePassword = await bcrypt.compareSync(password, existing.password);


   if(!comparePassword){
    return res.status(400).json({message: "Incorrect Password"});
   }

   const token = jwt.sign({_id: this._id}, process.env.JWTKEY,
    {
        "expiresIn":"1h"
    })

    return res.status(201).json({data: token, message: "Login Sucessfully", user: existing});

});

userrouter.get("/sign/get", async(req, res) => {
    let data;
    try {
        data = await user.find();
    } catch (error)  {
        return res.status(409).json({message:"Api Error"});
    }
    return res.status(200).json({data});
})

userrouter.get("/sign/:id", async(req, res) => {
    
    const id = req.params.id;
    
    let data;
    try {
        data = await user.findById(id);
    } catch (error) {
        console.log(error);
    }

    return res.status(200).json({user: data});

});

userrouter.post("/sign/", async(req, res) => {
    try {
        let User = await user.findOne({ email: req.body.email });
		if (!User)
			return res
				.status(409)
				.send({ message: "User with given email does not exist!" });

		let token = await Token.findOne({ userId: User._id });
		if (!token) {
			token = await new Token({
				userId: User._id,
				token: crypto.randomBytes(32).toString("hex"),
			}).save();
		}

		const url = `${process.env.BASE_URL}password-reset/${User._id}/${token.token}/`;
		await sendEmail(User.email, "Password Reset", url);

		
		res
			.status(201)
			.send({ message: "Password reset link sent to your email account" });

    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
})



userrouter.get("/sign/:id/:token", async (req, res) => {
	try {
		const User = await user.findOne({ _id: req.params.id });
		if (!User) return res.status(400).send({ message: "Invalid link" });

		const token = await Token.findOne({
			userId: User._id,
			token: req.params.token,
		});
		if (!token) return res.status(400).send({ message: "Invalid link" });

		res.status(200).send("Valid Url");
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

//  set new password
userrouter.post("/sign/:id/:token", async (req, res) => {
	try {
    

        const User = await user.findById(req.params.id);
        if (!User) return res.status(400).send("invalid link or expired");

        const token = await Token.findOne({
            userId: User._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).send("Invalid link or expired");

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

        User.password = hashPassword;
        await User.save();
        await token.delete();

        res.send("password reset sucessfully.");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
});

userrouter.delete("/sign/delete/:id", async(req, res) => {
   const id = req.params.id;

   let del;
   try {
    del = await user.findByIdAndRemove(id);  
   } catch (error) {
    return res.status(409).json({message: "api error"});
   }
return res.status(200).json({message:"user has blocked"});
})


module.exports = userrouter;
const express = require("express");
const likerouter = express.Router();
const like = require("../model/like");

likerouter.post("/like",async(req, res) => {
    const { name, price, image_1, image_2, image_3, discount, description, adminId } = req.body;

    try {
        
        let Like = new like({
            name, price, image_1, image_2, image_3, discount, description, adminId  
        });

        try {
            await Like.save();
        } catch (error) {
            return res.status(409).json({message: "Like post error"});
        }

        return res.status(200).json({message:"Like post sucessfully"});

    } catch (error) {
        return res.status(409).json({message: "Like post error"});
    }
});

likerouter.get("/like/:id", async(req, res) => {
    let id = req.params.id;

    let dsa;


    try {
        dsa = await like.filter((asx) => {
            return asx.clientId === id
        });
    } catch (error) {
        return res.status(409).json({message:" like code problem cheak, contact admin "})
    }

    return res.status(200).json({ message: "Like Successfully to added", dsa });

});

likerouter.delete("/like/delete/:id", async(req, res) => {
    let id = req.params.id;

    let da;

    try {
        da = await like.findByIdAndRemove(id);
    } catch (error) {
        return res.status(409).json({ message: "like not deleted please contact admin" });
    }

    return res.status(200).json({ message:"like delete successfully", da });

})


module.exports = likerouter;
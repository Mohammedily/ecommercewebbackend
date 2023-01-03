const express = require("express");

const cartrouter = express.Router();

const Cart = require("../model/cart");

cartrouter.post("/cart/post", async(req, res) => {
    const { name, price, image_1, discount, category, qty,size,description,  adminId, clientId } = req.body;

    try {
        
        let cart = new Cart({
            name, price, image_1, discount, category , qty,size,description,   adminId, clientId 
        });

        try {
            await cart.save();
        } catch (error) {
            
            console.log(error);
        }

        return res.status(201).json({cart,message:"cart post sucessfully"});

    } catch (error) {
        console.log(error);
    }

});

cartrouter.get("/cart/get", async(req, res) => {

    let cart;

    try {
        cart = await Cart.find()
    } catch (error) {
        console.log(error);
    }

    return res.status(200).json({ cart: cart });

});




cartrouter.delete("/cart/delete/:id", async(req, res) => {
    let id = req.params.id;

    let sa;
    try {
        sa = await Cart.findByIdAndRemove(id);
    } catch (error) {
        return res.status(409).json({message: "cart delete unsuccesfully"});
    }

    return res.status(200).json({ message: "cart delete successfully" });

})

module.exports = cartrouter;
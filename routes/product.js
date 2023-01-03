const express = require("express");

const productrouter = express.Router();

const Product = require("../model/product");

productrouter.post("/product/post", async(req, res) => {
    const { name, price, image_1, image_2, image_3, category,discount, description, adminId } = req.body;

    try {
        
        let product = new Product({
            name, price, image_1, image_2, image_3, category,discount, description, adminId  
        });

        try {
            await product.save();
        } catch (error) {
            return res.status(409).json({message: "product post error"});
        }

        return res.status(201).json({message:"product post sucessfully"});

    } catch (error) {
        return res.status(400).json({message: "api product post error"});
    }

});

productrouter.get(`/product/get`, async(req, res) => {
    let product;

    try {
        
            product = await Product.find();
        
    } catch (error) {
        return res.status(409).json({message: "product api error"});
    }

    return res.status(200).json({ product: product });

});

productrouter.get("/product/get/api", async(req, res) => {
    let Products;

    try {
        Products = await Product.find();
        function getRand(list) {
            return [...list].sort(() => Math.floor(Math.random() > 0.5 ? 1 : -1 )).slice(0,6);
          }
    
    
            return res.status(200).json(getRand(Products));
    } catch (error) {
        return res.status(409).json({message: "product api error"});
    }


});

productrouter.get("/product/:id", async(req, res) => {
    let id = req.params.id;

    let data;
    try {
        data = await Product.findById(id);
    } catch (error) {
        return res.status(409).json({message: "product network error"});
    }

    return res.status(200).json({data:data});

});

productrouter.put("/product/update/:id", async(req, res) => {
    const {  price, description, discount } = req.body;

    let asd;
    try {
        
    asd = await Product.findByIdAndUpdate(id, { price, description, discount });
         
    } catch (error) {
        return res.status(409).json({message: "product update error" });
    }

    return res.status(200).json({ message: "product update successfully" });

});

productrouter.delete("/product/delete/:id", async(req, res) => {
    let id = req.params.id;

    let sa;
    try {
        sa = await Product.findByIdAndRemove(id);
    } catch (error) {
        return res.status(409).json({message: "product delete unsuccesfully"});
    }

    return res.status(200).json({ message: "product delete successfully" });

})

module.exports = productrouter;
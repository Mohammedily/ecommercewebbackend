const express = require("express");

const addressrouter = express.Router();


const Address = require("../model/address");



addressrouter.post("/address/post", async(req, res) => {
    const {  door_no, street_name, city, state, country, pincode, clientId }  = req.body;

    let address;
    try{

        address = new Address({
            door_no, street_name, city, state, country, pincode, clientId
        });

    }catch(error){
        console.log(error);
    }

    try {
        await address.save();
    } catch (error) {
        console.log(error);
    }

    return res.status(201).json({message: "address sucessfully add"})
    
});

addressrouter.get("/address/get", async(req, res) => {
    let address;
    try {
        address = await Address.find();
    } catch (error) {
        console.log(error);
    }

    return res.status(201).send(address)
});

addressrouter.delete("/address/delete/:id", async(req, res) => {
    let { id } = req.params.id;

    let address;
    try {
        address = await Address.findByIdAndRemove(id);
    } catch (error) {
        console.log(error);
    }

    return res.status(201).send("address deleted successfully");

})

module.exports = addressrouter;
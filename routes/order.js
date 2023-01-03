const express = require("express");


const orderrouter = express.Router();

const Order = require("../model/order");

orderrouter.post("/order/post", async(req, res) => {
    
    
    
    const { stripe_id, name,address, product, totalAmount,token, userId } = req.body;

    

    try {
        
        let order = new Order({
            stripe_id,  name,address, product, totalAmount, email: token.email, source: token.id,Date: new Date(), userId, status: "Pending"
        });


        try {
            await order.save();
        } catch (error) {
            console.log(error);
        }

        return res.status(200).json({message:"order post sucessfully"});

    } catch (error) {
        console.log(error);
    }

});


orderrouter.get("/order/get/:id", async(req, res) => {

    const id = req.params.id;

let ords;

try {
    ords = await Order.findById(id);
} catch (error) {
    return res.status(409).json({message: "order error"});
}

return res.status(200).json({ ords: ords });

});



orderrouter.get("/order/get", async(req, res) => {
    let as;
    try {
        as = await Order.find();
    } catch (error) {
        return res.status(409).json({message: "no order found"});
    };

    return res.status(200).json({as});
});

orderrouter.get("/order/findget/:id", async(req, res) => {
    let id = req.params.id;

    let order;
    try {
        order = await Order.find();

        let o = await order.filter((as) => as.userId === id);

        return res.status(200).json({o});
    } catch (error) {
        return res.status(200).json(error);
    }
});

orderrouter.delete("/order/delete/:id", async(req, res) => {
    const id = req. params.id;
let del;
    try {
        del = await Order.findByIdAndRemove(id);
    } catch (error) {
        return res.status(409).json({message: "Api Error"});
    };

    return res.status(201).json({message:"Cancel Order"});
})

orderrouter.put("/order/update/:id", async(req, res) => {
    const id = req.params.id;
   
   let { status } = req.body;

   let fa;
    try {
          fa = await Order.findByIdAndUpdate(id, { status });   
   } catch (error) {
    console.log(error);
   }

   return res.status(200).json({ message: "Update Successfully..." });

})


module.exports = orderrouter;
const express = require("express");

const app = express();

const cors = require("cors");

const mongoose = require("mongoose");

const userrouter  = require("./routes/User"); 

const dotenv = require("dotenv");
const productrouter = require("./routes/product");
const cartrouter = require("./routes/cart");
const orderrouter = require("./routes/order");
const adminrouter = require("./routes/admin");
const likerouter = require("./routes/like");
const addressrouter = require("./routes/address");






dotenv.config();


mongoose.connect(process.env.MONGO).then(() => console.log("mongodb is connected")).catch((err) => console.log(err));

app.use(express.json());
app.use(cors());

app.use("/api", userrouter);
app.use("/api", productrouter);
app.use("/api", cartrouter);
app.use("/api", orderrouter);
app.use("/api", adminrouter);
app.use("/api", likerouter);
app.use("/api", addressrouter);


const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running on port ${port} 🔥`)
});
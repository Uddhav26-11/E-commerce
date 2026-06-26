const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/images", express.static("public/frontend_assets"));

app.use("/api/orders", require("./routes/orderRoute"));
app.use("/api/products", require("./routes/productRoute"));
app.use("/api/users", require("./routes/userRoute"));

app.get("/", (req, res) => {
  res.send("ForeverBuy API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});
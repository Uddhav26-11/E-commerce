const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

dotenv.config();

const connectDB = require("./config/db");
const User = require("./models/User");

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

const createManager = async () => {
  try {
    const existing = await User.findOne({
      email: "manager@gmail.com",
    });

    if (!existing) {
      const hashedPassword = await bcrypt.hash("123456", 10);

      await User.create({
        name: "Manager",
        email: "manager@gmail.com",
        password: 12345,
        role: "manager",
      });

      console.log("✅ Manager Created");
    }
  } catch (err) {
    console.log(err);
  }
};

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server Running on Port ${PORT}`);
  await createManager();
});
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config({ path: `./config.env` });
const PORT = process.env.PORT;
require("./database/conn");
const app = express();

app.listen(PORT, () => console.log(`Server started on port : ${PORT}`));

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
// app.get("/test", (req, res) => {
//   res.send("It works");
// });

// set up routes
app.use("/auth", require("./routers/userRouter"));
app.use("/customer", require("./routers/customerRouter"));

const mongoose = require("mongoose");

const DB = process.env.MDB_CONNECT;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log(`connection successful`);
  })
  .catch((error) => {
    console.log(error);
  });

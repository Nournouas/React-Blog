require("dotenv").config();
const express = require("express");
const { accountRouter } = require("./routes/accountRoute");
const { postsRouter } = require("./routes/postsRoute");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/API/", postsRouter);
app.use("/", accountRouter);



app.listen(process.env.PORT, () => {
  console.log(`API server listening on port ${process.env.PORT}`);
});
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());

app.listen(port, (err) => {
  if (err) console.log("Error happened while starting the server: ", err);
  console.log(`Server is running on port ${port}`);
});

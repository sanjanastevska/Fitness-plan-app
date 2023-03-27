const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const router = require("./routes/index.route");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());

app.use("/", router);

app.use((err, req, res, next) => {
  console.log(err);
  if (err && err.code && err.code == 401) {
    return res.status(err.code).json({ message: "Invalid data sent" });
  }
  return res.status(500).json({ message: "Internal server error" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static("public"));

app.use(require("./middlewares/log-something"));

app.use("/api/products", require("./routes/product-route"));

app.listen(3000, () => console.log(`Server listening on port 3000`));

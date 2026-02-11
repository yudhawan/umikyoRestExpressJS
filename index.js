const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { dbConnect } = require("./db/connection");
const routes = require("./routes");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api", routes);

async function main() {
  await dbConnect();
  app.listen(port, () => {
    console.log(`Running on port ${port}`);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

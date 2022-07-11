const path = require("path");
require("dotenv").config();
const app = require("./src/app");
const { init } = require("./src/db.js");

const PORT = process.env?.PORT ?? 8080;

init(path.join(__dirname, "db.json")).then(() => {
  app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
  });
});

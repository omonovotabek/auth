const mongoose = require("mongoose");
const config = require("config");
const app = require("./app");

const port = 5000;

async function start() {
  try {
    await mongoose.connect(config.get("DB_URL"));
    app.listen(port, () => {
      console.log(`Server listen on ${port}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();

const mongoose = require('mongoose')
const config = require('config')
const DB_URL = config.get("DB_URL")

module.exports.connect = () => {
   mongoose.connect(DB_URL)
   .then(() => console.log(`Database connect`))
   .catch((e) => console.log(e))
}
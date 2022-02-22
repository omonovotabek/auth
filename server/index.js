const app = require('./app')
const db = require('./database/mongodb')
const config = require('config')

const port = config.get('serverPort')

 async function start() {
 try {
     db.connect()
     app.listen(port, () => {
         console.log(`Server listen on ${port}`)
     })
 } catch (e) {
     console.log(e);
 }
}

start()
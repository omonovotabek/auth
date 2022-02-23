const multer = require('multer')
const moment = require('moment')

const storage = multer.diskStorage({
    destination(req, file, cb){
        cb (null, 'uploads/')
    },
    filename(req, file, cb) {
        const date = moment().format('DDMMYYYY-HHmmss SSS')
        cb (null, `${date}-${file.originalname}`)
    }
})

fileFilter = (req, res, cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
        cb(null, true)
    }else {
         cb(null, false)
    }
}

const limits = {
    fileSize: 1024*1024*5
}
module.exports = multer ({storage, limits})
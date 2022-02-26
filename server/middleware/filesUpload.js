const multer = require('multer')
const moment = require('moment')


const imgUpload = multer ({
    storage: multer.diskStorage({
        destination(req, file, cb){
            cb (null, 'uploads/images')
        },
        filename(req, file, cb) {
            const date = moment().format('DDMMYYYY-HHmmss SSS')
            cb (null, `${date}-${file.originalname}`)
        }
    }),

    fileFilter: (req, file, cb) => {
        if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg'){
            cb (null, true)
        }else {
            cb (null, false)
        }
    },

    limits: {
        fileSize: 1024*1024*5
    }
}).single('image')

const docUpload = multer ({
    storage: multer.diskStorage({
        destination(req, file, cb){
            cb (null, 'uploads/documents')
        },
        filename(req, file, cb) {
            const date = moment().format('DDMMYYYY-HHmmss SSS')
            cb (null, `${date}-${file.originalname}`)
        }
    }),

    // fileFilter: (req, file, cb) => {
    //     if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg'){
    //         cb (null, true)
    //     }else {
    //          cb (null, false)
    //     }
    // },

    // limits: {
    //     fileSize: 1024*1024*5
    // }
}).single('documents')


module.exports = {
    imgUpload, 
    docUpload
}
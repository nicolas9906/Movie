const multer = require ('multer')


const storage = multer.diskStorage({
    distination: function (req,file,cd){
        cb(null,'./storage/imgs'){
            cb(null,`${file.fieldname}-${Date.now()}.png`)
        }
    }
})


const upload = multer ({storate})

module.export= upload;
const multer = require('multer');
const{v4: uuidv4} = require('uuid');

const extMap = {
  'image/jpeg':'.jpg',
  'image/png': '.png',
};

const fileFilter = (req, file, cb)=>{      //file相當於index.js的request.file  //cb->callback
  cb(null, !!extMap[file.mimetype]);       // !!-> 轉成boolean(true / false)
};

const storage = multer.diskStorage({
  destination: (req, file, cb)=>{cb(null, __dirname+'/../public/uploads')},         //檔案儲存目的地
  filename: (req, file, cb)=>{
    const filename = uuidv4() + extMap[file.mimetype];
    cb(null, filename);
  },
});

module.exports = multer({fileFilter, storage});
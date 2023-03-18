import { Request, Response, Router } from 'express';
const path = require('path');
import multer from 'multer';

const storage = multer.diskStorage({
    
    destination: function (req, file, cb) {
      const pathimgs = path.join(process.cwd() , 'src', 'bee_imgs')

      cb(null, pathimgs)


    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);

    }
  });

const upload = multer({ storage: storage });
  
const handleFileUpload = upload.single('image');

export default handleFileUpload

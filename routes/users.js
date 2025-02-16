import express from "express";
import { getAll, login, register, del, update, getProfile } from "../controllers/users.js";
import { authorization } from "../middlewere/authorization.js";
import {validation_mw_login} from "../middlewere/validation.js"
import allowedTo from "../middlewere/allowedTo.js";
import multer from "multer";
import ErrorCreator from "../utilities/errorCreator.js";

let router = express.Router();

// const upload = multer({ dest: 'uploads/static_users' })
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        let ext =  file.mimetype.split('/')[1]
        const uniqueSuffix = Date.now() + '.' + ext
        cb(null, 'profile' + '-' + uniqueSuffix)
      }
    })
const fileFilter = (req, file, cb)=> {
    let fileType = file.mimetype.split('/')[0];
    if(fileType === 'image') {
        return cb(null, true);
    } else {
        cb(new ErrorCreator().create('file type is not accepted', 400), false)
    }
}
    const upload = multer({ storage: storage, fileFilter: fileFilter })

// router.get('uploads/profile.jpg', (req, res, next)=> getProfile(req, res, next));

router.get('/', authorization, (req, res, next)=> getAll(req, res, next));

router.get('/login', validation_mw_login(),  (req, res, next)=> login(req, res, next));

router.post('/register', upload.single('avatar'), (req, res, next)=> register(req, res, next));
router.put('/:id/update', authorization, (req, res, next)=> update(req, res, next));
router.delete('/:id/delete', authorization, allowedTo("ADMIN", "MANAGER"), (req, res, next)=> del(req, res, next));

export default router;
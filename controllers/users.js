import { User } from "../models/users.js";
import asyncWrapper from '../middlewere/asyncWrapper.js';
import bcrypt from 'bcryptjs';
import { validationResult  } from "express-validator";
import jsend from "jsend";
import ErrorCreator from "../utilities/errorCreator.js";
import { generateToken } from "../utilities/genToken.js";

let getAll = asyncWrapper(
    async(req, res)=> {

            let users = await User.find()
            res.send(users);
    }
)

let register = asyncWrapper(
    async(req, res, next)=> {
        console.log('FILE', req.file)
        let pw = req.body.password;
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(pw, salt);
        console.log('body',req.body)
        let body = req.body
        body.password = hash;
        body.avatar = req.file.filename;
        console.log('BODY', body)
        let user = new User(body);
        let jsonWebToken = generateToken(user)
        user.token = jsonWebToken;
        let newUser = await user.save()
        res.send(newUser)
    }
)

let login = asyncWrapper(
    async(req, res, next)=> {
    console.log('login')
        let {email, password} = req.body;
        //validation
        const result = validationResult(req);
        console.log(result)
        if (!result.isEmpty()) {
            const error = new ErrorCreator();
            const theErr = error.create('email and password are required', 400)
            throw theErr;
          }
          //check if user is exsist
          let user = await User.findOne({"email": email});
          if(user) {
            if(bcrypt.compareSync(password, user.password)) {
                let jsonWebToken = generateToken(user)
                res.send(jsend.success(jsonWebToken))
            } else {
                res.status(400).send(jsend.error('the password is wrong'))
            }
          } else {
            const error = new ErrorCreator();
            const theErr = error.create('user not found, check the email', 404)
            throw theErr;
          }
    }
)
let update = asyncWrapper(
    async (req, res, next)=> {
        let id = req.params.id;
        console.log(req.body)
        let editedUser = await User.findOneAndUpdate({_id: id}, req.body, {new: true})
        if(!editedUser) {
            let err = new Error();
            err.message = 'No user found';
            throw(err);
        }
        res.send(editedUser)
    }
)
let del = asyncWrapper(
    async (req, res)=> {
        console.log('DELETE')
        let id = req.params.id;
        let deletREsult = await User.deleteOne({_id: id});
        if(deletREsult.deletedCount === 0) {
            const error = new ErrorCreator();
            const theErr = error.create('no items deleted', 404)
            throw theErr;
        }
        res.send(deletREsult)
    }
)

let getProfile = asyncWrapper(
    async(req, res, next)=> {
        res.send('static/profile.jpg')
    }
)



export {
    getAll,
    register,
    login,
    update,
    del,
    getProfile
}
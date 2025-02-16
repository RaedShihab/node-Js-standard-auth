import ErrorCreator from "../utilities/errorCreator.js";
import jwt from 'jsonwebtoken';
import asyncWrapper from './asyncWrapper.js';

let authorization = asyncWrapper(
    async(req, res, next)=> {
        if(!req.headers.authorization) {
            const error = new ErrorCreator();
            const theErr = error.create('you are nit authorized to access this rout', 400)
            throw theErr;
        }
        let token = req.headers.authorization.split(' ')[1];
        let decodedT = jwt.verify(token, process.env.jwt_secret_key)
        console.log(decodedT)
        req.role = decodedT.role
        next();
    }
)

export {
    authorization
}
import jwt from "jsonwebtoken";

let generateToken = ({email, _id, role})=> {
    let jsonWebToken = jwt.sign({email: email, id: _id, role}, process.env.jwt_secret_key, {expiresIn: '20m'});
    return jsonWebToken;
}

export {
    generateToken
}
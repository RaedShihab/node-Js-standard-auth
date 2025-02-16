import ErrorCreator from "../utilities/errorCreator.js";

let allowedTo = (...roles)=> {
    return (req, res, next)=> {
        let role = req.role || 'USER';
        console.log(roles, role)
        if(roles.includes(role)) {
            return next()
        }
        const error = new ErrorCreator();
        const theErr = error.create('you dont have permission to do this')
        next(theErr);
    }
}
export default allowedTo;
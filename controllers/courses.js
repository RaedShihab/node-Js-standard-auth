import { Course } from "../models/courses.js";
import jsend from "jsend";
import { validationResult } from 'express-validator';
import asyncWrapper from "../middlewere/asyncWrapper.js";
import ErrorCreator from "../utilities/errorCreator.js";

// let getTest = async asyncF(
//     theFuncton()
// )

let getAll = asyncWrapper (
    async (req, res, next)=> {
        let page = req.query.page || 1;
        let limit = req.query.limit || 3;
        let skip = (page * limit) - limit
        let coureses = await Course.find().limit(limit).skip(skip);
        res.send(jsend.success(coureses));
        // try {
        // } catch(err) {
        //     let errObj = jsend.fail({err:err.message})
        //         res.status(400).send(errObj)
        // }
    }
)
let getOne = asyncWrapper(
    async (req, res, next)=> {
    let id = req.params.id;
        let course = await Course.findById(id)
        if(!course) {
            let err = new Error();
            err.message = "no course founded"
            err.status = 404
            next(err)
            return;
        }
        res.send(jsend.success(course))
})

let addOne = asyncWrapper(async(req, res, next)=> {
    const course = new Course(req.body);
    const result = validationResult(req);
    let newCourse = await course.save();
    let success = jsend.success(newCourse);
    res.send(success)
    // if (result.isEmpty()) {
    // } else {
    //     let err = new Error();
    //     console.log('result')
    //     err.message = result.errors;
    //     err.status = 400;
    //     throw(err)
    //     // next(err);
    // }
})
let updateOne = asyncWrapper(async (req, res)=> {
    let query = {_id: req.params.id}
    let courseToUpdated;
    const result = validationResult(req);
    console.log(result)
    if (!result.isEmpty()) {
        let err = new Error();
        err.status = 400;
        err.message = result.errors;
        throw(err);
    }
    else {
        courseToUpdated = await Course.findOneAndUpdate(query, req.body, {returnDocument: 'after'});
        if(!courseToUpdated) {
            let err = new Error();
            err.message = 'No course found';
            throw(err);
        }
        res.status(201).send(jsend.success(courseToUpdated));
    }
})
let deleteOne = asyncWrapper(async(req, res)=> {
    let id = req.params.id
    let deleted = await Course.deleteOne({_id: id})
    if(deleted.deletedCount === 0) {
        const error = new ErrorCreator();
        const theErr = error.create('no items deleted', 404)
        throw theErr;
    }
     res.status(200).send(jsend.success(deleted));
})
export {
    getAll,
    getOne,
    addOne,
    updateOne,
    deleteOne
}

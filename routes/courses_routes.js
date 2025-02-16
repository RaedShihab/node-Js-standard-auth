import express from "express";
import {addOne, deleteOne, getAll, getOne, updateOne} from '../controllers/courses.js'
import {validation_mw_course} from "../middlewere/validation.js";


let courses_router = express.Router();
let route = courses_router.route('/');


courses_router.get('/', (req, res, next)=> getAll(req, res, next));

courses_router.get('/:id', (req, res, next)=> getOne(req, res, next));

courses_router.post('/add', (req, res, next)=> addOne(req, res, next));

courses_router.put('/:id/update', validation_mw_course(), (req, res, next)=> updateOne(req, res, next));

courses_router.delete('/:id/delete', (req, res, next)=> deleteOne(req, res, next));

export default courses_router;
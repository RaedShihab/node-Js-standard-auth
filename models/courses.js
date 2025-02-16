import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true}
});
const Course = mongoose.model('Course', schema);

export {
    Course
}
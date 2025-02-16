//**************Using mongoos (and mon mongoos is the base object)
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
import jsend from "jsend";
import courses_router from './routes/courses_routes.js';
import users_router from './routes/users.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Define __dirname manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


let app = express();
app.use(express.json());

app.use(cors())


mongoose.connect(process.env.uri)
  .then(() => console.log('Connected!'));

// app.use('/api/users/files', express.static('./uploads'));
app.use('/api/users/files', express.static(path.join(__dirname, './uploads')));

app.use('/api/courses', courses_router);
app.use('/api/users', users_router);

app.all('*', (req, res)=> {
  res.status(404).send(jsend.error('the resourc is not available'))
})

app.use((err, req, res, next)=> {
  res.status(err.status || 500).json(jsend.error({
    message: err.message || "unknown error"
}))
})

app.listen(5000, ()=> console.log('app listen on port 5000'));



// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allow specific HTTP methods
//   res.header('Access-Control-Allow-Headers', 'Content-Type'); // Allow specific headers
//   next();
// });


//**************Using mongo Atlas (and MongoClient is the base object)
// import { ClientEncryption, MongoClient } from 'mongodb';
// const uri = "mongodb+srv://raedshihab92:node1992@clusternode.c6wn1.mongodb.net/?retryWrites=true&w=majority&appName=ClusterNode";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri);

// async function run() {
//     await client.connect();
//     console.log('Connected successfully');

//     const db = client.db('nodeDB');
//     const courses_collection  = db.collection('courses');

//     await courses_collection.insertMany([{ name: 'react' }, {name: 'node'}]);

//     let allCourses = await courses_collection.find().toArray();
//     console.log(allCourses);
// }
// run().catch(console.dir);
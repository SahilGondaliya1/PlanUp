import express from 'express';
import cors from 'cors'
import {writeFile , readFile} from 'fs/promises';
import dotenv from 'dotenv';
import taskRoutes from './routes/taskRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

const dbFile = 'public/DB/index.json';

//use environment varibales
dotenv.config();

//create new application
const app = new express;

//use middlewares
app.use(express.json());
app.use(cors());

//routes
app.use('/tasks',taskRoutes);

//error handling
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
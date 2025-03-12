import express from 'express';
import productsRouter from './routes/products.js';
import mongoose from 'mongoose';

// Make database connection
await mongoose.connect(process.env.MONG0_URI);


//Create an express app
const app =express();

// use global middlewares
app.use(express.json());

//use route
app.use(productsRouter);

const port =process.env.PORT || 3000;

//listen for incoming request
app.listen(3000, () => {
    console.log(`Server listening on port ${port}`);
})
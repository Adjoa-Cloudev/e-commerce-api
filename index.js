import express from 'express';
import productsRouter from './routes/products.js';
import mongoose from 'mongoose';
import userRouter from './routes/users.js';

// Make database connection
await mongoose.connect(process.env.MONG0_URI);


//Create an express app
const app =express();

// use global middlewares
app.use(express.json());

//use route
app.use(productsRouter);
app.use(userRouter);

const port =process.env.PORT || 3001;

//listen for incoming request
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
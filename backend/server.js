import express from 'express';
import cors from 'cors';
import authroter from './routes/auth.js';

const app=express();
app.use(cors());
app.use(express.json());
app.use('/api',authroter);

app.listen(3000,()=>console.log('running'));

import bcrptjs from 'bcryptjs';
import express from 'express';
import { db } from '../db.js';
import jsonwebtoken from 'jsonwebtoken';

const router = express.Router();
const SECRET = process.env.JWT_SECRT;

router.post('/register', async(req,res)=>{
    try{
        const {username,password}=req.body;
        const hashed=await bcrptjs.hash(password,10);
        await db.query('INSERT INTO user(username,password) values (?,?)',[username,hashed]);
        res.status(201).json({message: 'สำเร็จ'});
    }catch (err){
        res.status(400).json({message: 'ไมสำเร็จ'+err.message});
    }
})

export default router
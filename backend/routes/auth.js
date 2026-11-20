import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {db} from '../db.js'; // ดึงdb

const router = express.Router();
const SECRET = process.env.JWT_SECRET;

router.post('/register', async(req,res)=>{
    try {
        const {username,password}=req.body;
        const hashed = await bcrypt.hash(password,10);
        await db.query('INSERT INTO user (username, password) values (?,?)',[username,hashed]);
        res.status(201).json({message: 'สำเร็จ'});
    }catch (err){
        res.status(400).json({message:'ไม่สำเร็จ' + err.message});
    }
});

router.post('/login',async (req,res)=>{
    try{
        const {username, password}=req.body;
        const [rows]=await db.query('SELECT * FROM user WHERE username = ?',[username]);
        if (rows.length === 0) return res.status(401).json({message:'ไม่พบผู้ใข้'});

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({message: 'รหัสผ่านไม่ถูกต้อง'});
        const token = jwt.sign({id: user.id, username: user.username}, SECRET, { expiresIn: '1d'});
        res.json({message: 'เข้าสู๋ระบบสำเร็จ', token});
    }   catch (err) {
        res.status(500).json({message: err.message});
    }
});

export default router;
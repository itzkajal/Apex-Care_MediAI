import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../config/database.js";

function tokenFor(user){return jwt.sign({id:user.id,email:user.email,name:user.name},process.env.JWT_SECRET,{expiresIn:"2h"});}

export async function register(req,res,next){
  try{
    const {name,email,password}=req.body;
    if(!name||!email||!password||password.length<8)return res.status(400).json({message:"Name, email and password (minimum 8 characters) are required"});
    const [exists]=await pool.query("SELECT id FROM users WHERE email=?",[email.toLowerCase()]);
    if(exists.length)return res.status(409).json({message:"Email already registered"});
    const hash=await bcrypt.hash(password,12);
    const [result]=await pool.query("INSERT INTO users(name,email,password_hash) VALUES(?,?,?)",[name,email.toLowerCase(),hash]);
    const user={id:result.insertId,name,email:email.toLowerCase()};
    res.status(201).json({token:tokenFor(user),user});
  }catch(e){next(e);}
}
export async function login(req,res,next){
  try{
    const {email,password}=req.body;
    const [rows]=await pool.query("SELECT id,name,email,password_hash FROM users WHERE email=?",[String(email||"").toLowerCase()]);
    if(!rows.length||!(await bcrypt.compare(password||"",rows[0].password_hash)))return res.status(401).json({message:"Invalid email or password"});
    const user={id:rows[0].id,name:rows[0].name,email:rows[0].email};
    res.json({token:tokenFor(user),user});
  }catch(e){next(e);}
}

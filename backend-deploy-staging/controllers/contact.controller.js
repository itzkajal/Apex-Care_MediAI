import { pool } from "../config/database.js";
export async function getContact(req,res,next){
  try{const [rows]=await pool.query("SELECT hospital_name,address,phone,email,timings FROM hospital_contact LIMIT 1");res.json(rows[0]||{});}
  catch(e){next(e);}
}
export async function postContact(req,res,next){
  try{
    const {name,email,message}=req.body;
    if(!name||!email||!message)return res.status(400).json({message:"All fields are required"});
    await pool.query("INSERT INTO contact_messages(name,email,message) VALUES(?,?,?)",[name,email,message]);
    res.status(201).json({message:"Contact message submitted"});
  }catch(e){next(e);}
}

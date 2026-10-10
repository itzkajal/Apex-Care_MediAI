import { pool } from "../config/database.js";
import { askBedrock } from "../services/bedrock.service.js";
export async function chat(req,res,next){
  try{
    const message=String(req.body?.message||"").trim();
    if(!message||message.length>1000)return res.status(400).json({message:"Message is required and must be <= 1000 characters"});
    const reply=await askBedrock(message);
    if(req.user?.id)await pool.query("INSERT INTO ai_chat_history(user_id,user_message,ai_response) VALUES(?,?,?)",[req.user.id,message,reply]);
    res.json({reply});
  }catch(e){next(e);}
}

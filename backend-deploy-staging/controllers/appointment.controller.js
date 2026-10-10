import { pool } from "../config/database.js";
export async function listAppointments(req,res,next){
  try{const [rows]=await pool.query(`SELECT a.id,a.appointment_date,a.status,a.reason,d.name AS doctor_name,d.specialization
    FROM appointments a JOIN doctors d ON d.id=a.doctor_id WHERE a.user_id=? ORDER BY a.appointment_date DESC`,[req.user.id]);res.json(rows);}
  catch(e){next(e);}
}
export async function createAppointment(req,res,next){
  try{
    const {doctor_id,appointment_date,reason}=req.body;
    if(!doctor_id||!appointment_date)return res.status(400).json({message:"doctor_id and appointment_date are required"});
    const [docs]=await pool.query("SELECT id FROM doctors WHERE id=? AND active=1",[doctor_id]);
    if(!docs.length)return res.status(404).json({message:"Doctor not found"});
    const [result]=await pool.query("INSERT INTO appointments(user_id,doctor_id,appointment_date,reason) VALUES(?,?,?,?)",
      [req.user.id,doctor_id,appointment_date,reason||null]);
    res.status(201).json({id:result.insertId,message:"Appointment created"});
  }catch(e){next(e);}
}
export async function updateAppointment(req,res,next){
  try{
    const {status}=req.body;
    const allowed=["booked","confirmed","cancelled","completed"];
    if(!allowed.includes(status))return res.status(400).json({message:"Invalid status"});
    const [r]=await pool.query("UPDATE appointments SET status=? WHERE id=? AND user_id=?",[status,req.params.id,req.user.id]);
    if(!r.affectedRows)return res.status(404).json({message:"Appointment not found"});
    res.json({message:"Appointment updated"});
  }catch(e){next(e);}
}
export async function deleteAppointment(req,res,next){
  try{const [r]=await pool.query("DELETE FROM appointments WHERE id=? AND user_id=?",[req.params.id,req.user.id]);
    if(!r.affectedRows)return res.status(404).json({message:"Appointment not found"});res.json({message:"Appointment deleted"});}
  catch(e){next(e);}
}

import { pool } from "../config/database.js";
export async function getDoctors(req,res,next){
  try{const [rows]=await pool.query(`SELECT d.id,d.name,d.specialization,d.qualification,d.experience_years,dp.name AS department_name
    FROM doctors d JOIN departments dp ON dp.id=d.department_id WHERE d.active=1 ORDER BY d.name`);res.json(rows);}
  catch(e){next(e);}
}

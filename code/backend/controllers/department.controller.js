import { pool } from "../config/database.js";
export async function getDepartments(req,res,next){
  try{const [rows]=await pool.query("SELECT id,name,description,timings FROM departments WHERE active=1 ORDER BY name");res.json(rows);}
  catch(e){next(e);}
}

import { Router } from "express";
import { pool } from "../config/database.js";
const router=Router();
router.get("/health",async(req,res)=>{try{await pool.query("SELECT 1");res.json({status:"healthy"});}catch{res.status(503).json({status:"unhealthy"});}});
export default router;

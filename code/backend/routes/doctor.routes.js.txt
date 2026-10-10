import { Router } from "express"; import { getDoctors } from "../controllers/doctor.controller.js";
const router=Router();router.get("/doctors",getDoctors);export default router;

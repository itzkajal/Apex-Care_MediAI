import { Router } from "express"; import { requireAuth } from "../middleware/auth.middleware.js";
import { listAppointments,createAppointment,updateAppointment,deleteAppointment } from "../controllers/appointment.controller.js";
const router=Router();router.get("/appointments",requireAuth,listAppointments);router.post("/appointments",requireAuth,createAppointment);
router.put("/appointments/:id",requireAuth,updateAppointment);router.delete("/appointments/:id",requireAuth,deleteAppointment);export default router;

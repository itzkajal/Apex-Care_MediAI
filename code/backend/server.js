import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import healthRoutes from "./routes/health.routes.js";
import authRoutes from "./routes/auth.routes.js";
import doctorRoutes from "./routes/doctor.routes.js";
import departmentRoutes from "./routes/department.routes.js";
import appointmentRoutes from "./routes/appointment.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();
const port = Number(process.env.PORT || 3000);
const corsOrigin = process.env.CORS_ORIGIN || "*";

app.disable("x-powered-by");
app.use(helmet());
app.use(cors({origin: corsOrigin === "*" ? true : corsOrigin.split(",").map(v=>v.trim())}));
app.use(express.json({limit:"1mb"}));
app.use(morgan("combined"));
app.use(rateLimit({windowMs: 60_000, limit: 120, standardHeaders: true, legacyHeaders: false}));

app.use("/api", healthRoutes);
app.use("/api", authRoutes);
app.use("/api", doctorRoutes);
app.use("/api", departmentRoutes);
app.use("/api", appointmentRoutes);
app.use("/api", aiRoutes);
app.use("/api", contactRoutes);

app.use((req,res)=>res.status(404).json({message:"Route not found"}));
app.use(errorHandler);

app.listen(port, "0.0.0.0", ()=>console.log(`APEX Care Hospital API listening on port ${port}`));

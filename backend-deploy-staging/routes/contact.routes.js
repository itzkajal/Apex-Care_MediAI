import { Router } from "express"; import { getContact,postContact } from "../controllers/contact.controller.js";
const router=Router();router.get("/contact",getContact);router.post("/contact",postContact);export default router;

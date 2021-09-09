import express from 'express';
import { createUser, deleteData, getUser, sendMail, updateUser } from '../controllers/formData.js'
const router = express.Router();


router.post("/createuser", createUser);
router.get("/getuser", getUser);
router.delete("/delete", deleteData);
router.post("/update", updateUser);
router.post("/sendmail", sendMail);

export default router;
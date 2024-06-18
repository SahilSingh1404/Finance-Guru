import express from "express";
import {addUrl, addImg, delUrl} from '../controllers/user.js'

const router = express.Router();

//Routes for user api
router.post("/addUrl/:userId",addUrl);
router.put("/addImg/:userId",addImg);
router.delete("/deleteFile/:userId",delUrl)

export default router;
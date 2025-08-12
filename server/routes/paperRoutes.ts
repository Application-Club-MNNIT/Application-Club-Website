import express from "express";
import paperController from "../controllers/paperController";
import authControllerUser from "../controllers/authControllerUser";

const router = express.Router();


//Paper request
router.post("/uploadPaper", authControllerUser.protect, paperController.createPaper);

//Get all paper requests
router.get("/getAllPaperRequests", paperController.getAllPaperRequests);

//Get paper request by ID 
router.get("/getPaperRequest/:id", paperController.getPaperRequestById);

//Update paper request status
router.put("/updatePaperRequest/:id", paperController.updatePaperRequestStatus);

//Delete paper request by ID
router.delete("/deletePaperRequest/:id", paperController.deletePaperRequestById);


export default router;
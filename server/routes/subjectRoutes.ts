import subjectController from "../controllers/subjectController";
import express from "express";

const router = express.Router();

router.post("/add", subjectController.createSubject);
router.get("/getAll", subjectController.getSubjects);
router.get("/findById", subjectController.getSubjectById);
router.get("/findByCourse", subjectController.getSubjectsByCourseId);
router.delete("/delete", subjectController.deleteSubject);

export default router;

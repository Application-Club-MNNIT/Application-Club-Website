import subjectController from "../controllers/subjectController";
import express from "express";
import authControllerUser from "../controllers/authControllerUser";

const router = express.Router();

router.post("/add", authControllerUser.shallowProtect, subjectController.createSubject);
router.get("/getAll", authControllerUser.shallowProtect, subjectController.getSubjects);
router.get("/findById", authControllerUser.shallowProtect, subjectController.getSubjectById);
router.get("/findByCourse", authControllerUser.shallowProtect, subjectController.getSubjectsByCourseId);
router.delete("/delete", authControllerUser.shallowProtect, subjectController.deleteSubject);

export default router;

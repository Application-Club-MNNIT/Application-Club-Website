import teacherController from "../controllers/teacherController";
import express from "express";

const router = express.Router();

//for adding a teacher
router.post(
    "/add",
    teacherController.addTeacher,
)

//for getting all teachers
router.get(
    "/getAll",
    teacherController.getAllTeachers
)

//for deleting a teacher
router.delete(
    "/delete",
    teacherController.deleteTeacher,
)

//find a teacher with a given Id
router.get(
    "/find",
    teacherController.getTeacherById
)

export default router;


module.exports = router;

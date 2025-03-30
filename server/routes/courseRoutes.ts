import express from "express";
import courseController from "../controllers/courseController";
import catchAsync from "../util/catchAsync";

const router = express.Router();

router.post("/add", courseController.addCourse);
router.get("/get", courseController.getCourses);
router.delete("/remove", courseController.deleteCourse);

export default router;


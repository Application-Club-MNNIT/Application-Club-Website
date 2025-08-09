import { Request, Response, NextFunction } from "express";
import catchAsync from "../util/catchAsync";
import AppError from "../util/appError";
import Course from "../model/CourseModel";

const addCourse = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;

    if (!name) {
        return next(new AppError("Course name is required", 400));
    }

    const validCourses = ["Btech", "Mtech", "Msc", "Mca", "Mba"];
    if (!validCourses.includes(name)) {
        return next(
            new AppError(
                `Invalid course name. Must be one of: ${validCourses.join(", ")}`,
                400
            )
        );
    }

    const course = await Course.create({ name });

    res.status(201).json({
        status: "success",
        data: {
            course
        }
    });
});

const getCourses = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const courses = await Course.find();

    res.status(200).json({
        status: "success",
        results: courses.length,
        data: {
            courses
        }
    });
});

const deleteCourse = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;

    const course = await Course.findByIdAndDelete(id);

    if (!course) {
        return next(new AppError("No course found with that ID", 404));
    }

    res.status(204).json({
        status: "success",
        data: null
    });
});

export default { addCourse, getCourses, deleteCourse};

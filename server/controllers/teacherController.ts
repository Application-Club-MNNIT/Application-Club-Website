import catchAsync from "../util/catchAsync";
import AppError from "../util/appError";
import Teacher from "../model/TeacherModel";
import {NextFunction, Request, Response} from "express";
import {DeleteResult} from "mongoose";

//to add teacher 
const addTeacher = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const createdBy: string = req.user.email;
    const name: string = req.body.name;
    const email: string = req.body.email;

    if (!(name && email)) return next(new AppError("Provide all fields!", 400));

    // check if the user already exists
    const existingTeacher = await Teacher.findOne({
        $or: [{email}]
    });

    if (existingTeacher) {
        res.status(400).json({
            status: "failure",
            message: `Teacher with ${email} already exists!`,
        });
        return;
    }

    const teacher = await Teacher.create({
        name,
        email,
        createdBy
    });

    res.status(201).json({
        status: "success",
        message: "Teacher created!",
        teacher
    });
});

//to delete teacher 
const deleteTeacher = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const teacherId: string = req.body.teacherId;

    if (!(teacherId)) return next(new AppError("Provide all fields!", 400));

    // check if the teacher exists
    const teacher = await Teacher.findById(teacherId);
    if (!teacher)
        return next(new AppError("Teacher not found!", 400));

    // teacher found now delete it
    const result: DeleteResult = await teacher.deleteOne();

    if (result.acknowledged && result.deletedCount === 1) {
        res.status(201).json({
            status: "success",
            message: "Teacher deleted!",
            teacher
        });
    }

    res.status(400).json({
        status: "fail",
        message: "Teacher could not be deleted!"
    });
});

//to find teacher with a given Id
const getTeacherById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const teacherId: string = req.body.teacherId;

    if (!(teacherId)) return next(new AppError("Provide all fields!", 400));

    // check if the teacher exists
    const teacher = await Teacher.findById(teacherId);
    if (!teacher)
        return next(new AppError("Teacher not found!", 400));

    res.status(201).json({
        status: "success",
        message: "Teacher found!",
        teacher
    });
});

//to get all the teachers
const getAllTeachers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const teachers = await Teacher.find();
    res.status(200).json({
        status: "success",
        data: teachers
    });
});

//functionality to update/reset password is not implemented
export default {
    addTeacher,
    getAllTeachers,
    getTeacherById,
    deleteTeacher,
}
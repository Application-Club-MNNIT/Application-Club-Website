import {Request, Response, NextFunction} from "express";
import catchAsync from "../util/catchAsync";
import AppError from "../util/appError";
import mongoose from "mongoose";

import QuestionPaperUploadRequestModel from "../model/PaperModel";


//Store paper request by user for admins approval
const createPaper = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {course, subject, academicSession, year, semester, teacher, examType, driveLink} = req.body;
    const uploadedBy = req.user._id;
    if (!course || !subject || !teacher || !uploadedBy || !driveLink) {
        return next(new AppError("All fields are required", 400));
    }

    const request = await QuestionPaperUploadRequestModel.create({
        course,
        subject,
        academicSession,
        year,
        semester,
        teacher,
        examType,
        driveLink,
        uploadedBy
    });

    res.status(201).json({
        status: "success",
        message: "Paper upload request created successfully",
        request,
    });
});

const getAllPaperRequests = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const requests = await QuestionPaperUploadRequestModel.find()
        .populate("course subject teacher uploadedBy")
        .sort({createdAt: -1});

    res.status(200).json({
        status: "success",
        results: requests.length,
        data: {
            requests,
        },
    });
});

const getPaperRequestById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new AppError("Invalid request ID", 400));
    }

    const request = await QuestionPaperUploadRequestModel.findById(id)
        .populate("course subject teacher uploadedBy");

    if (!request) {
        return next(new AppError("Invalid request ID", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            request,
        },
    });
});

const updatePaperRequestStatus = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;
    const {status} = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new AppError("Invalid request ID", 400));
    }

    const request = await QuestionPaperUploadRequestModel.findByIdAndUpdate(
        id,
        {status},
        {new: true, runValidators: true}
    );

    if (!request) {
        return next(new AppError("Invalid request ID", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            request,
        },
    });
});

const deletePaperRequestById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new AppError("Invalid request ID", 400));
    }

    const request = await QuestionPaperUploadRequestModel.findByIdAndDelete(id);

    if (!request) {
        return next(new AppError("Invalid request ID", 404));
    }

    res.status(204).json({
        status: "success",
        message: "Request deleted successfully",
    });
});
//End of Admin approval phase


// This controller handles the creation, retrieval, updating, and deletion of paper requests.
// It includes functions to create a new paper request, get all paper requests, get a specific paper request by ID,


//Here controller to add papers after the admins actions


export default {
    createPaper,
    getAllPaperRequests,
    getPaperRequestById,
    updatePaperRequestStatus,
    deletePaperRequestById,
};
  
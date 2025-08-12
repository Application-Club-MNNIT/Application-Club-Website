import Subject from "../model/SubjectModel";
import {Request, Response} from "express";
import catchAsync from "../util/catchAsync";

// Create a new subject
const createSubject = catchAsync(async (req: Request, res: Response) => {
    try {
        const {name, subjectCode, course} = req.body;

        if (!name) return res.status(400).json({message: "Name is required"});
        if (!subjectCode) return res.status(400).json({message: "Subject Code is required"});
        if (!course) return res.status(400).json({message: "Course is required"});
        const newSubject = new Subject({name, subjectCode, course: course.toUpperCase()});
        await newSubject.save();
        res.status(201).json(newSubject);
    } catch (error) {
        res.status(500).json({message: "Server error", error});
    }
});

// Get all subjects
const getSubjects = catchAsync(async (_req: Request, res: Response) => {
    try {
        const subjects = await Subject.find();
        res.status(200).json(subjects);
    } catch (error) {
        res.status(500).json({message: "Server error", error});
    }
});

// Get a subject by ID
const getSubjectById = catchAsync(async (req: Request, res: Response) => {
    try {
        const {id} = req.body;
        const subject = await Subject.findById(id);
        if (!subject) return res.status(404).json({message: "Subject not found"});
        res.status(200).json(subject);
    } catch (error) {
        res.status(500).json({message: "Server error", error});
    }
});

// Get subjects by course ID
const getSubjectsByCourseId = catchAsync(async (req: Request, res: Response) => {
    try {
        const {courseId} = req.body;
        const subjects = await Subject.find({courses: courseId});
        res.status(200).json(subjects);
    } catch (error) {
        res.status(500).json({message: "Server error", error});
    }
});

// Delete a subject by ID
const deleteSubject = catchAsync(async (req: Request, res: Response) => {
    try {
        const {id} = req.body;
        const subject = await Subject.findByIdAndDelete(id);
        if (!subject) return res.status(404).json({message: "Subject not found"});
        res.status(200).json({message: "Subject deleted successfully"});
    } catch (error) {
        res.status(500).json({message: "Server error", error});
    }
});

// Export all functions in a single object
export default {
    createSubject,
    getSubjects,
    getSubjectById,
    getSubjectsByCourseId,
    deleteSubject,
};

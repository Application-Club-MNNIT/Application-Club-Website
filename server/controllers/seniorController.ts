import {Request, Response, NextFunction} from "express";
import catchAsync from "../util/catchAsync";
import Senior from "../model/Senior";
import User from "../model/UserModel";
import AppError from "../util/appError";
import {Types} from "mongoose";

export const getAllSeniors = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const loggedInUserId = req.user._id;
    const searchQuery = req.query.company?.toString();

    const filter = searchQuery
        ? {
            interviews: {
                $elemMatch: {
                    company: {$regex: searchQuery, $options: "i"}, // case-insensitive match
                },
            },
        }
        : {};
    console.log("filter", filter);
    console.log("searchQuery", searchQuery);
    const seniors = await Senior.find(filter);
    console.log("seniors", seniors);
    const formattedSeniors = seniors.map((senior) => ({
        ...senior.toObject(),
        isFollowing: loggedInUserId ? senior.followers.includes(new Types.ObjectId(loggedInUserId as string)) : false,
    }));

    res.status(200).json({status: "success", data: formattedSeniors});
});

export const getSeniorById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const loggedInUserId = req.user._id;


    const senior = await Senior.findById(req.params.id).populate("interviews followers").exec();

    if (!senior) {
        return res.status(404).json({status: "fail", message: "Senior not found"});
    }

    res.status(200).json({
        status: "success",
        data: {
            ...senior.toObject(),
            isFollowing: loggedInUserId ? senior.followers.includes(new Types.ObjectId(loggedInUserId as string)) : false,
        },
    });
});

export const followSenior = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const userId = req.user._id;

    if (!Types.ObjectId.isValid(userId as string)) {
        return next(new AppError("Invalid user ID.", 400));
    }

    const [senior, user] = await Promise.all([
        Senior.findById(req.params.id),
        User.findById(userId)
    ]);

    if (!senior || !user) {
        return next(new AppError("Senior or User not found", 404));
    }

    const userObjectId = new Types.ObjectId(userId as string);
    const seniorObjectId = new Types.ObjectId(senior.id);

    const isAlreadyFollowing = senior.followers.some((follower) => follower.equals(userObjectId));

    if (isAlreadyFollowing) {
        // Unfollow
        senior.followers = senior.followers.filter((follower) => !follower.equals(userObjectId));
        user.followedSeniors = user.followedSeniors?.filter((s) => !s.equals(seniorObjectId));
    } else {
        // Follow
        if (!Array.isArray(senior.followers))
            senior.followers = [];
        senior.followers.push(userObjectId);

        if (!Array.isArray(user.followedSeniors))
            user.followedSeniors = [];
        user.followedSeniors.push(seniorObjectId);
    }

    await Promise.all([senior.save(), user.save()]);

    if (typeof senior.updateMentorStatus === "function") {
        await senior.updateMentorStatus();
    }

    res.status(200).json({
        status: "success",
        action: isAlreadyFollowing ? "unfollowed" : "followed",
        followers: senior.followers.length
    });
});

interface IInterview {
    date: Date;
    company: string;
    role: string;
    questionTypes?: string[];
    interviewExperience?: string;
    adviceToJuniors?: string;
}

export const addSenior = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const {
        name,
        regNumber,
        linkedin,
        batch,
        branch,
        interviews = [], // default value as an empty array
    } = req.body;
    // Validate required fields
    if (!name || !regNumber || !linkedin || !batch || !branch) {
        return res.status(400).json({message: "All fields are required"});
    }

    // Validate the format of interview dates if necessary
    if (interviews.length > 0) {
        const invalidInterview = interviews.find(
            (interview: IInterview) => !interview.date || !interview.company || !interview.role
        );
        if (invalidInterview) {
            return res.status(400).json({
                message: "Each interview must have a valid date, company, and role",
            });
        }

        // Remove undefined optional fields
        interviews.forEach((interview: IInterview) => {
            if (!interview.questionTypes) delete interview.questionTypes;
            if (!interview.interviewExperience) delete interview.interviewExperience;
            if (!interview.adviceToJuniors) delete interview.adviceToJuniors;
        });
    }

    // Check for existing entry based on regNumber
    const existingSenior = await Senior.findOne({regNumber});
    if (existingSenior) {
        return res.status(409).json({message: "Senior already exists"});
    }

    // Create a new senior instance
    const newSenior = new Senior({
        name,
        regNumber,
        linkedin,
        batch,
        branch,
        interviews, // Array of interviews
    });

    // Save the senior
    await newSenior.save();

    // Respond with the newly added senior
    res.status(201).json({
        message: "Senior added successfully",
        data: newSenior,
    });
});

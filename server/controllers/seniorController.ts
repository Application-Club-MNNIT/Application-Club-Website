import { Request, Response, NextFunction } from "express";
import catchAsync from "../util/catchAsync";
import Senior from "../model/Senior";
import User from "../model/UserModel";
import AppError from "../util/appError";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";

export const getAllSeniors = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let token = req.cookies.jwt;
    let loggedInUserId: string | null = null;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
            loggedInUserId = decoded.id;
        } catch (error) {
            console.error("JWT verification failed:", error);
        }
    }

    const seniors = await Senior.find().populate("interviews");

    const formattedSeniors = seniors.map((senior) => ({
        ...senior.toObject(),
        isFollowing: loggedInUserId ? senior.followers.includes(new Types.ObjectId(loggedInUserId)) : false,
    }));

    res.status(200).json({ status: "success", data: formattedSeniors });
});
export const getSeniorById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let token = req.cookies.jwt;
    let loggedInUserId: string | null = null;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
            loggedInUserId = decoded.id;
        } catch (error) {
            console.error("JWT verification failed:", error);
        }
    }

    const senior = await Senior.findById(req.params.id).populate("interviews followers").exec();

    if (!senior) {
        return res.status(404).json({ status: "fail", message: "Senior not found" });
    }

    res.status(200).json({
        status: "success",
        data: {
            ...senior.toObject(),
            isFollowing: loggedInUserId ? senior.followers.includes(new Types.ObjectId(loggedInUserId)) : false,
        },
    });
});

export const followSenior = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;

    if (!token) {
        return next(new AppError("You are not logged in! Please log in again.", 401));
    }

    let decoded: JwtPayload;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    } catch (err) {
        return next(new AppError("Invalid token. Please log in again.", 401));
    }

    const userId = decoded.id;

    if (!Types.ObjectId.isValid(userId)) {
        return next(new AppError("Invalid user ID.", 400));
    }

    const [senior, user] = await Promise.all([
        Senior.findById(req.params.id),
        User.findById(userId)
    ]);

    if (!senior || !user) {
        return next(new AppError("Senior or User not found", 404));
    }

    const userObjectId = new Types.ObjectId(userId);
    const seniorObjectId = new Types.ObjectId(senior.id);

    console.log("seniorObjectId", seniorObjectId);
    console.log("userObjectId", userObjectId);
    
    const isAlreadyFollowing = senior.followers.some((follower) => follower.equals(userObjectId));

    if (isAlreadyFollowing) {
        // Unfollow
        senior.followers = senior.followers.filter((follower) => !follower.equals(userObjectId));
        user.followedSeniors = user.followedSeniors.filter((s) => !s.equals(seniorObjectId));
    } else {
        // Follow
        senior.followers.push(userObjectId);
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

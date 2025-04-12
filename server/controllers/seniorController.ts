import { Request, Response, NextFunction } from "express";
import catchAsync from "../util/catchAsync";
import Senior from "../model/Senior";
import User from "../model/UserModel";
import AppError from "../util/appError";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";
import { IUser } from "../model/UserModel";
import { Document } from "mongoose";

export interface AuthenticatedRequest extends Request {
    user?: Document<unknown, {}, IUser> & IUser;
  }
  export const getAllSeniors = catchAsync(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const loggedInUserId = req.user._id;

    const seniors = await Senior.find();
  
    const formattedSeniors = seniors.map((senior) => ({
      ...senior.toObject(),
      isFollowing: loggedInUserId ? senior.followers.includes(new Types.ObjectId(loggedInUserId as string)) : false,
    }));
  
    res.status(200).json({ status: "success", data: formattedSeniors });
  });
  
export const getSeniorById = catchAsync(async (req:AuthenticatedRequest, res: Response, next: NextFunction) => {
    const loggedInUserId = req.user._id;


    const senior = await Senior.findById(req.params.id).populate("interviews followers").exec();

    if (!senior) {
        return res.status(404).json({ status: "fail", message: "Senior not found" });
    }

    res.status(200).json({
        status: "success",
        data: {
            ...senior.toObject(),
            isFollowing: loggedInUserId ? senior.followers.includes(new Types.ObjectId(loggedInUserId as string)) : false,
        },
    });
});

export const followSenior = catchAsync(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    
    const userId= req.user._id;

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


export const addSenior = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {
      name,
      regNumber,
      linkedin,
      batch,
      branch,
      interviews = [],
    } = req.body;
  
    // Optional validation
    if (!name || !regNumber || !linkedin || !batch || !branch) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    // Check for existing entry
    const existingSenior = await Senior.findOne({ regNumber });
    if (existingSenior) {
      return res.status(409).json({ message: "Senior already exists" });
    }
  
    const newSenior = new Senior({
      name,
      regNumber,
      linkedin,
      batch,
      branch,
      interviews,
    });
  
    await newSenior.save();
  
    res.status(201).json({
      message: "Senior added successfully",
      data: newSenior,
    });
  });
  
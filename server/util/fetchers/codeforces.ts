import { Request, Response, NextFunction } from "express";
import axios from "axios";
import catchAsync from "../catchAsync" 
import AppError from "../appError";     
import { log } from "node:console";

export const getCodeforcesRating = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const username: string = req.params.username;

    if (!username || typeof username !== "string") {
      return next(new AppError("Invalid or missing username", 400));
    }

    let resData: any;
    try {
      resData = await axios.get(
        `https://codeforces.com/api/user.info?handles=${username}`
      );
    } catch (err) {
      return next(new AppError("Failed to fetch data from Codeforces API", 500));
    }

    const data = resData.data;
    if (
      !data ||
      data.status !== "OK" ||
      !Array.isArray(data.result) ||
      data.result.length === 0
    ) {
      return next(new AppError("Codeforces user not found", 404));
    }

    const user = data.result[0];
    const rating = user.rating ?? 0;

    res.status(200).json({
      status: "success",
      data: {
        username: user.handle,
        rating,
        maxRating: user.maxRating,
      },
    });
  }
);


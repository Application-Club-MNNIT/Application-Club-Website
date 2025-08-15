import catchAsync from "../util/catchAsync";
import jwt, {JwtPayload} from "jsonwebtoken";
import AppError from "../util/appError";
import User, {IUser} from "../model/UserModel";
import {CookieOptions, NextFunction, Request, Response} from "express";
import {sendEmail} from "../util/email";

//returns a jwt token created using given id
const signToken = (id: any) => {
    return jwt.sign({id: id}, process.env.JWT_SECRET as string);
};

//creates a jwt token using user's _id, put it into a cookie and send it as response
const createSendToken = (user: IUser, status: number, res: Response) => {
    const token = signToken(user._id);

    user.password = "";

    //set cookies
    const options: CookieOptions =
        process.env.NODE_ENV === "development"
            ? {
                expires: new Date(Date.now() + Number(process.env.COOKIE_EXPIRY_DAYS) * 24 * 60 * 60 * 1000),
                httpOnly: true,
                secure: false,
                sameSite: "lax",
            }
            : {
                expires: new Date(Date.now() + Number(process.env.COOKIE_EXPIRY_DAYS) * 24 * 60 * 60 * 1000),
                httpOnly: true,
                secure: true,
                sameSite: "none", // Required for cross-site cookies
                domain: process.env.FRONTEND_DOMAIN, // ".applicationclubmnnit.com"
            };

    res.cookie("jwt", token, options);

    res.status(status).json({
        status: "success",
        user,
    });
};


//to sing up the user
const signup = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const username: string = req.body.username;
    const email: string = req.body.email;
    const name: string = req.body.name;
    const phone: number = req.body.phone;
    const password: string = req.body.password;

    let batch: number, branch: string;
    const p1: string[] = email.toLowerCase().split("@")[0].split(".");
    const regNumber: string = p1[p1.length - 1];
    if (regNumber.startsWith("ca", 4)) {
        batch = parseInt(regNumber.substring(0, 4), 10) + 3;
        branch = "MCA";
    } else if (regNumber.startsWith("msc", 4)) {
        batch = parseInt(regNumber.substring(0, 4), 10) + 2;
        branch = "MSC";
    } else {
        batch = parseInt(regNumber.substring(0, 4), 10);
        branch = "NA";
    }


    if (!(username && email && name && phone && password)) return next(new AppError("Provide all fields!", 400));

    // check if the user already exists
    const existingUser = await User.findOne({
        $or: [{username}, {email}, {regNumber}]
    });

    console.log(existingUser);
    if (existingUser)
        if (existingUser.verified) return next(new AppError("User already exists", 401));
        else await User.deleteOne({_id: existingUser.id});


    const otp = Math.floor(10000 + Math.random() * 90000);

    const user = await User.create({
        username,
        name,
        email,
        regNumber,
        batch,
        branch,
        phone,
        password,
        otp
    });

    user.password = "";
    user.otp = 0;
    user._id = "";
    user.past14Days = [];
    user.sheets = [];

    await sendEmail({
        email: email,
        subject: "Here is your OTP for email verification",
        html: `Yout OTP is <br/> ${otp} <br/> Valid only for 10 minutes.`,
    });

    res.status(201).json({
        status: "success",
        message: "Unverified user created!",
        user
    });
});

const verifyEmail = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    //todo: protect against bruteforce attacks
    const email = req.body.email;
    const otp = req.body.otp;

    const user = await User.findOne({email: email}).select("+otp");
    if (!user) return next(new AppError("No user with this email id!", 401));
    if (user.verified) return next(new AppError("User is already verified!", 401));

    if (user.otp && otp && user.otp === otp) {
        user.verified = true;
        user.otp = undefined;
        await user.save();
        createSendToken(user, 201, res);
        return;
    } else {
        return next(new AppError("OTP mismatch!", 401));
    }
});


//makes sure that user is logged in == has a valid bearer token
//if all is good, that user is added to the req
//this protection does not require all coding profiles to be verified
const shallowProtect = catchAsync(async (req: Request, _, next: NextFunction) => {
    let token = req.cookies.jwt;

    if (!token)
        return next(new AppError("You are not logged in! Please log in again.", 401));

    // verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    // check if user still exists => to check the case if user has jwt token but the user was deleted!
    const freshUser = await User.findOne({_id: decoded.id})
        .select("+leetcode +gfg +codeforces +github +profileVerificationData");
    
    if (!freshUser)
        return next(new AppError("The user belonging to this token does not exist.", 401));

    // check if user changed password after jwt was issued
    if (freshUser.changePasswordAfter(decoded.iat))
        return next(new AppError("User recently changed their password! Please login again.", 401));

    //grant access to the protected route
    //also add this user to the request object
    req.user = freshUser;
    next();
});

const protect = [shallowProtect, catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findOne({_id: req.user.id}).select("leetcode.verified gfg.verified codeforces.verified leetcode.username gfg.username codeforces.username");
    if (!user)
        return res.status(404).json({
            status: "fail",
            message: "User not found"
        });

    if (!user.leetcode.username || !user.leetcode.verified || !user.gfg.username || !user.gfg.verified || !user.codeforces.username || !user.codeforces.verified) {
        return res.status(400).json({
            status: "fail",
            message: "You need to verify all coding platforms to access this feature",
            redirectionUrl: "/setting/verifyProfiles"
        });
    }

    next();
})];

const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const loginCredential: string = req.body.loginCredential.toLowerCase();
    const password: string = req.body.password;

    //check if email and password exists => user entered these fields
    if (!loginCredential || !password)
        return next(new AppError("Email/username or password not provided", 400));

    //check if user exists and password is correct
    //we have restricted the default selection of password, so we explicitly select password
    const user = await User.findOne({
        [loginCredential.endsWith("@mnnit.ac.in") ? "email" : "username"]: {
            $regex: `^${loginCredential}$`,
            $options: "i"
        }
    }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password)))
        return next(new AppError("Incorrect email/username or password!", 401));

    createSendToken(user, 200, res);
});


const logout = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const options: CookieOptions =
        process.env.NODE_ENV === "development"
            ? {
                expires: new Date(0), // Set expiration time to the past
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                path: "/",
            }
            : {
                expires: new Date(0), // Set expiration time to the past
                httpOnly: true,
                secure: true,
                sameSite: "none", // Required for cross-site cookies
                path: "/",
                domain: process.env.FRONTEND_DOMAIN, // ".applicationclubmnnit.com"
            };

    res.cookie("jwt", "", options);

    res.json({
        status: "success",
        message: "Logged out successfully",
    });
});


//functionality to update/reset password is not implemented
export default {
    signup,
    verifyEmail,
    protect,
    shallowProtect,
    login,
    logout
}

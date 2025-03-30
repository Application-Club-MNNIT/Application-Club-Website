import userController from "./../controllers/userController"; //this format, instead of using path, helps intellisense
import authController from "../controllers/authControllerUser";
import rateLimit from "express-rate-limit";
import express, {Request, Response, NextFunction} from "express";
import {sendEmail} from "../util/email";
import catchAsync from "../util/catchAsync";

const router = express.Router();

//for signing up
router.post(
    "/signup",
    rateLimit({
        windowMs: Number(process.env.RATE_LIMIT_TIME),
        limit: 5,
        message: "Rate limit exceeded, please try again later.",
    }), authController.signup
);

//to verify email
router.post(
    "/verifyEmail",
    authController.verifyEmail,
)

router.post(
    "/getCodingPlatformVerificationString",
    authController.shallowProtect,
    userController.makeUserCodingProfileVerificationReady
)

router.post(
    "/verifyCodingPlatform",
    authController.shallowProtect,
    userController.verifyCodingProfile,
)

router.post(
    "/isUsernameAvailable",
    userController.isUsernameAvailable
)

router.post(
    "/login",
    authController.login,
)

router.post(
    "/logout",
    authController.logout
)

//
// //for logging in
// router.post(
//     "/login",
//     rateLimit({
//         windowMs: Number(process.env.RATE_LIMIT_TIME),
//         limit: 7,
//         message: "Rate limit exceeded, please try again later.",
//     }),
//     authController.login
// );
//
// router.post("/logout", authController.logout); //ok


router.get("/test", catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        status: "success",
    });
}));

export default router;


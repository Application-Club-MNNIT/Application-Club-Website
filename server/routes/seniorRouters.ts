import express from "express";
import * as seniorController from "../controllers/seniorController";
import authController from "../controllers/authControllerUser";
import rateLimit from "express-rate-limit";

const router = express.Router();

// Rate limit for API calls
const rateLimiter = rateLimit({
    windowMs: Number(process.env.RATE_LIMIT_TIME),
    limit: 10,
    message: "Too many requests, please try again later."
});

// Routes
router.get("/", rateLimiter, authController.shallowProtect,seniorController.getAllSeniors);
router.get("/:id", rateLimiter,authController.shallowProtect, seniorController.getSeniorById);
router.post("/follow/:id", authController.shallowProtect, seniorController.followSenior);

export default router;

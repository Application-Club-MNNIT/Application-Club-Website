import express, {NextFunction, Request, Response} from "express";
import catchAsync from "../util/catchAsync";
import leadController from "../controllers/leadController";
import authControllerUser from "../controllers/authControllerUser";

const router = express.Router();


router.post("/addPotd", authControllerUser.protect, leadController.addPotd);
router.get("/getAllLeads", authControllerUser.protect, leadController.getAllLeads);
router.get("/getAllPotdsSubmissionData", authControllerUser.protect, leadController.getAllPotdSubmissionData);

router.get("/test", catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        status: "success",
    });
}));

export default router;

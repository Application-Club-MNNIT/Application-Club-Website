import {Request, Response, NextFunction} from "express";
import Potd, {IPotd} from "../model/PotdModel";
import catchAsync from "../util/catchAsync";
import AppError from "../util/appError";
import {RequestWithUser} from "../types";
import {getQuestionId} from "../util/getQuestionId";
import LeetcodeDictionary from "../model/LeetcodeDictionary";
import GfgDictionary from "../model/GfgDictionary";
import CodeforcesDictionary from "../model/CodeforcesDictionary";
import axios from "axios";
import User from "../model/UserModel";

const addPotd = catchAsync(async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user.isLead) return next(new AppError("User is not a LeadPage", 400));

    const {date, questionLink} = req.body;
    if (!date || !questionLink) return next(new AppError("All data not provided", 400));

    // Batch of juniors
    const juniorsBatch = user.batch + 1;
    const juniorsBranch = user.branch;

    // Get the questionId
    const [questionId, platform, slug] = await getQuestionId(questionLink);
    if (!questionId) return next(new AppError("Invalid question details", 400));

    //add to dictionary
    const DictionaryMap = {
        leetcode: LeetcodeDictionary,
        codeforces: CodeforcesDictionary,
        gfg: GfgDictionary,
    };
    const Dictionary = DictionaryMap[platform];
    const alreadyExists = await Dictionary.findOne({questionId: questionId.substring(1)});
    if (!alreadyExists)
        await Dictionary.create({questionId: questionId.substring(1), slug});

    // Find the existing Potd document or create a new one
    let potdDoc: IPotd = await Potd.findOne({batch: juniorsBatch, branch: juniorsBranch});

    if (!potdDoc) {
        potdDoc = await Potd.create({
            branch: juniorsBranch,
            batch: juniorsBatch,
            potds: [],
        });
    }

    // Add new POTD entry
    potdDoc.potds.push({date: new Date(new Date(date).setHours(0, 0, 0, 0)), questionId});
    await potdDoc.save();

    //call extension server to recache potds. no need to await
    axios.get(`${process.env.EXTENSION_SERVER}/user/recachePotd`).catch((err: Error) => {
        //pass
    })

    res.status(200).json({
        status: "success",
        message: "POTD added successfully",
        potd: potdDoc,
    });
});


const getAllLeads = catchAsync(async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user.isLead) return next(new AppError("User is not a LeadPage", 400));

    const leads = await User.find({isLead: true}).select("email").lean();
    res.status(200).json({
        status: "success",
        leads: leads,
    })
});

const getAllPotdSubmissionData = catchAsync(async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user.isLead) return next(new AppError("User is not a LeadPage", 400));

    const users = await User.find({batch: user.batch + 1, branch: user.branch}).select("regNumber potds.status").lean();
    res.status(200).json({
        status: "success",
        potdSubmissionData: users,
    })
})

const getSheetSubmissionData = catchAsync(async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user.isLead) return next(new AppError("User is not a LeadPage", 400));

    const users = await User.find({
        batch: user.batch + 1,
        branch: user.branch,
    }).select("regNumber sheets").lean();

    res.status(200).json({status: "success", users});
})

const getJuniorsData = catchAsync(async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user.isLead) return next(new AppError("User is not a LeadPage", 400));

    const users = await User.find(
        {
            batch: user.batch + 1,
            branch: user.branch
        },
        {
            name: 1,
            regNumber: 1,
            phone: 1,
            "leetcode.username": 1,
            "gfg.username": 1,
            "codeforces.username": 1,
            "github.username": 1,
            sheets: 1,
            potds: 1,
            past14Days: 1
        }
    ).lean();


    res.status(200).json({status: "success", users});
})

const specialSignup = catchAsync(async (req: RequestWithUser, res: Response, next: NextFunction) => {
    if (!req.user.isLead) return next(new AppError("User is not a LeadPage", 400));

    const {username, name, email, phone, password, leetcode, codeforces, gfg, github} = req.body;
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

    const user = await User.create({
        username,
        name,
        email,
        regNumber,
        batch,
        branch,
        phone,
        password,
        verified: true,
        codeforces: {
            username: codeforces,
            submissions: [],
            verified: true,
            lastSubmissionTimestamp: 0,
            lastRequestTimestamp: 0
        }, leetcode: {
            username: leetcode,
            submissions: [],
            verified: true,
            lastSubmissionTimestamp: 0,
            lastRequestTimestamp: 0
        }, gfg: {
            username: gfg,
            submissions: [],
            verified: true,
            lastSubmissionTimestamp: 0,
            lastRequestTimestamp: 0
        }, github: {
            username: github,
            verified: true
        }
    });

    res.status(200).json({
        status: "success",
        user
    })
})

export default {addPotd, getAllLeads, getAllPotdSubmissionData, getSheetSubmissionData, getJuniorsData, specialSignup};

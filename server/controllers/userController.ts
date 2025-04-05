import catchAsync from "../util/catchAsync";
import axios from "axios";
import AppError from "../util/appError";
import {RequestWithUser} from "../types";
import {NextFunction, Request, Response} from "express";
import User from "../model/UserModel";
import LeetcodeDictionary from "../model/LeetcodeDictionary";
import GfgDictionary from "../model/GfgDictionary";
import CodeforcesDictionary from "../model/CodeforcesDictionary";
import Potd from "../model/PotdModel";

//cache
let dictionary;
const initializeDictionary = async (): Promise<void> => {
    const leetcodeDocs = await LeetcodeDictionary.find({}).select("-_id -__v");
    const gfgDocs = await GfgDictionary.find({}).select("-_id -__v");
    const codeforcesDocs = await CodeforcesDictionary.find({}).select("-_id -__v");

    const leetcode = {}, gfg = {}, codeforces = {};
    leetcodeDocs.forEach(doc => leetcode[doc.questionId] = doc.slug);
    gfgDocs.forEach(doc => gfg[doc.questionId] = doc.slug);
    codeforcesDocs.forEach(doc => codeforces[doc.questionId] = doc.slug);

    dictionary = {leetcode, gfg, codeforces};
    console.log("dictionary initialized");
}
initializeDictionary()

const getLeetcodeName = async (username: string): Promise<string> => {
    try {
        const query = `
    query userPublicProfile($username: String!) { 
        matchedUser(username: $username) { 
            profile { 
                realName 
            } 
        } 
    }`;

        const response = await axios.post(
            "https://leetcode.com/graphql/",
            {query, variables: {username}},
            {
                headers: {
                    "Content-Type": "application/json",
                    "Referer": "https://leetcode.com/",
                    "Origin": "https://leetcode.com",
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
                },
            }
        );

        return response.data?.data?.matchedUser?.profile?.realName;
    } catch (e) {
        return null;
    }
}

const getGfgName = async (username: string): Promise<string> => {
    try {
        const response = await axios.get(`https://authapi.geeksforgeeks.org/api-get/user-profile-info/?handle=${username}`);
        return response.data.data?.name;
    } catch (e) {
        return null;
    }
}

const getCodeforcesName = async (username: string): Promise<string> => {
    try {
        const response = await axios.get(`https://codeforces.com/api/user.info?handles=${username}&checkHistoricHandles=false`);
        return response.data.result[0]?.firstName;
    } catch (e) {
        return null;
    }
}

const getGithubName = async (username: string): Promise<string> => {
    try {
        const response = await axios.get(`https://api.github.com/users/${username}`);
        return response.data.name;
    } catch (e) {
        return null;
    }
}

const isUsernameAvailable = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const username: string = req.body.username;
    if (!username) return next(new AppError("Username not provided!", 400));
    //case in-sensitive username search
    const user = await User.findOne({username: {$regex: new RegExp(`^${username}$`, "i")}, verified: true});
    res.status(200).json({
        status: "success",
        available: !user,
    });
});

const verifyCodingProfile = catchAsync(async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const user = req.user;
    const platform: string = req.body.platform;
    const username: string = req.body.username;

    if (!platform || !username) return next(new AppError("username or platform not provided!", 400));

    if (!["leetcode", "gfg", "codeforces", "github"].includes(platform)) return next(new AppError(`This platform "${platform}" is not our concern at the moment.`, 400));
    if (user[platform].verified) return next(new AppError(`User has already verified a username for ${platform}.`, 401));
    if (!user.profileVerificationData.randomName) return next(new AppError("Name to check with was not found in the database!", 400));

    let name: string;
    if (platform === "leetcode")
        name = await getLeetcodeName(username);
    else if (platform === "gfg")
        name = await getGfgName(username);
    else if (platform === "codeforces")
        name = await getCodeforcesName(username);
    else if (platform === "github")
        name = await getGithubName(username);

    if (!name) return next(new AppError("Check your username and try again", 400));
    if (name !== user.profileVerificationData.randomName) return next(new AppError(`Name mismatch (actual: ${name})`, 400));
    user[platform].username = username;
    user[platform].verified = true;
    await user.save();

    res.status(200).json({
        status: "success",
        message: `${platform} verified!`
    });
});

const makeUserCodingProfileVerificationReady = catchAsync(async (req: RequestWithUser, res: Response) => {
    const user = await User.findOne({id: req.user.id}).select("profileVerificationData leetcode gfg codeforces github");
    console.log(user);

    const lastRequestTimestamp: number = user.profileVerificationData?.lastRequestTimestamp || 0;
    const fifteenMinutesInMs = 15 * 60 * 1000;
    const hasFifteenMinutesPassed = Date.now() - lastRequestTimestamp >= fifteenMinutesInMs;

    let randomString: string = null;

    const unverifiedPlatforms: string[] = [];
    const verifiedPlatforms = [];
    for (const platform of ['leetcode', 'gfg', 'codeforces', 'github'])
        if (!user[platform].verified) {
            unverifiedPlatforms.push(platform);
        } else {
            verifiedPlatforms.push({platform, username: user[platform].username});
        }

    if (unverifiedPlatforms.length > 0)
        if (hasFifteenMinutesPassed) {
            user.profileVerificationData.randomName = ((length = 8) => {
                const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
                return letters.charAt(Math.floor(Math.random() * letters.length)) +
                    Array.from({length: length - 1}, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
            })();
            user.profileVerificationData.lastRequestTimestamp = Date.now();
        } else {
            randomString = user.profileVerificationData.randomName;
        }

    await user.save();
    res.status(200).json({
        status: "success",
        unverifiedPlatforms,
        verifiedPlatforms,
        randomString
    });

});

const getSubmissionData = catchAsync(async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const platform = req.params.platform?.toLowerCase(); // leetcode, gfg, codeforces
    const page = parseInt(req.query.page as string) || 1;

    if (!platform) return next(new AppError("Platform not provided", 400));
    if (!["gfg", "codeforces", "leetcode"].includes(platform)) return next(new AppError("We are not concerned with this platform", 400));

    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    console.log(req.user);

    const user = await User.findOne(
        {_id: req.user.id},
        {
            [`${platform}.submissions`]: {$slice: [skip, pageSize]}, // paginate here
            [`${platform}.username`]: 1,
            [`${platform}.verified`]: 1,
        }
    );

    res.status(200).json({
        status: "success",
        data: {
            platform,
            submissions: user[platform].submissions,
            username: user[platform].username,
            verified: user[platform].verified,
        }
    })

});

const getProfileData = catchAsync(async (req: RequestWithUser, res: Response, next: NextFunction) => {
    console.log(req.user.id);
    const user = await User.findOne({_id: req.user.id}).select("" +
        "username name email regNumber branch batch phone leetcode gfg codeforces github past14Days sheets potds"
    );
    if (!user) return next(new AppError("Failed to retrieve profile details", 400));
    res.status(200).json({
        status: "success",
        user: user
    })
});

const getDictionary = catchAsync(async (req: RequestWithUser, res: Response, next: NextFunction) => {
    res.status(200).json({
        status: "success",
        dictionary
    })
});

const getAllPotds = catchAsync(async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const user = req.user;

    let potds = [];
    const potdDoc = await Potd.findOne({batch: user.batch + 1, branch: user.branch});
    if (user.isLead) {
        potds = potdDoc.potds;
    } else {
        const today = new Date(new Date().setHours(0, 0, 0, 0));

        for (let potd of potdDoc.potds) {
            const potdDate = new Date(potd.date);
            if (potdDate.getTime() <= today.getTime())
                potds.push(potd);
            else
                break;
        }
    }

    res.status(200).json({
        status: "success",
        potds: potds,
    })
})


export default {
    makeUserCodingProfileVerificationReady,
    verifyCodingProfile,
    isUsernameAvailable,
    getProfileData,
    getDictionary,
    getSubmissionData,
    getAllPotds
};

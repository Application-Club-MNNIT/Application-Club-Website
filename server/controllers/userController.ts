import catchAsync from "../util/catchAsync";
import axios from "axios";
import AppError from "../util/appError";
import {RequestWithUser} from "../types";
import {NextFunction, Response, Request} from "express";
import User from "../model/UserModel";


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
    const user = await User.findOne({username: {$regex: new RegExp(`^${username}$`, "i")}});
    res.status(200).json({
        status: "success",
        available: !user,
    });
});

const verifyCodingProfile = catchAsync(async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const user = req.user;
    const platform: string = req.body.platform;
    const username: string = req.body.username;

    //todo: add more platform names as needed
    if (!platform || !username) return next(new AppError("username or platform not provided!", 400));

    if (!["leetcode", "gfg", "codeforces", "github"].includes(platform)) return next(new AppError(`This platform "${platform}" is not our concern at the moment.`, 400));
    if (user[platform].verified) return next(new AppError(`User has already verified a username for ${platform}.`, 401));
    if (!user.profileVerificationData.randomName) return next(new AppError("Name to check with was not found in the database!", 400));

    //todo: actually verify the platform, add more platforms as needed
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

const makeUserCodingProfileVerificationReady = catchAsync(async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const user = req.user;

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
            randomString = ((length = 8) =>
                Array.from({length}, () => 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
                    .charAt(Math.random() * 62)).join(''))();
            user.profileVerificationData.randomName = randomString;
            user.profileVerificationData.lastRequestTimestamp = Date.now();
        } else {
            randomString = user.profileVerificationData.randomName;
        }

    //todo: add more platforms as needed
    await user.save();
    res.status(200).json({
        status: "success",
        unverifiedPlatforms,
        verifiedPlatforms,
        randomString
    });

});


export default {makeUserCodingProfileVerificationReady, verifyCodingProfile, isUsernameAvailable};

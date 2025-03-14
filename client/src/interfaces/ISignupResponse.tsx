import { AxiosResponse } from 'axios';

export default interface ISignupResponse extends AxiosResponse {
    data: {
        message: string | null;
        user: {
            username: string;
            name: string;
            email: string;
            regNumber: string;
            branch: string;
            batch: number;
            phone: number;
            leetcode: {
                verified: boolean;
                lastSubmissionTimestamp: number;
                lastRequestTimestamp: number;
                submissions: any[];
            };
            gfg: {
                verified: boolean;
                lastSubmissionTimestamp: number;
                lastRequestTimestamp: number;
                submissions: any[];
            };
            codeforces: {
                verified: boolean;
                lastSubmissionTimestamp: number;
                lastRequestTimestamp: number;
                submissions: any[];
            };
            github: {
                verified: boolean;
            };
            verified: boolean;
            _id: string;
            createdAt: Date;
            updatedAt: Date;
            __v: number;
        };
    };
};

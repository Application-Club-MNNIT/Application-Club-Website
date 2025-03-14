import { AxiosResponse } from 'axios';

export default interface ISignupResponse extends AxiosResponse {
    data: {
        status: string;
        message: string;
        email: string;
    };
}


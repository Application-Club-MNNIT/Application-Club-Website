import {IUser} from "../model/UserModel";

// This needs to be a module declaration to properly augment Express types
declare global {
    namespace Express {
        // Augment the Request interface
        interface Request {
            user: IUser;
        }
    }
}

// Make this file a module
export {};

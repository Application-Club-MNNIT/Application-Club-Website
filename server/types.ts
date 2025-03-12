import {IUser} from "./model/UserModel";
import {Request} from "express";
import {Document} from "mongoose";


export interface RequestWithUser extends Request {
    user?: Document & IUser;
}
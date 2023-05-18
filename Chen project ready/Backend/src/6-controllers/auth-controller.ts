import express, { NextFunction, Request, Response } from "express";
import CredentialsModel from "../4-models/credentials-model";
import UserModel from "../4-models/user-model";
import authLogic from "../5-logic/auth-logic";

const router = express.Router();

// http://localhost:3001/api/auth/register
router.post("/auth/register", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = new UserModel(request.body);
        const token = await authLogic.register(user);
        response.status(201).json(token);
    } 
    catch (err: any) {
        next(err);
    }
})

// http://localhost:3001/api/auth/login
router.post("/auth/login", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const credential = new CredentialsModel(request.body);
        const token = await authLogic.login(credential);
        response.json(token);
    } 
    catch (err: any) {
        next(err);
    }
})


export default router;

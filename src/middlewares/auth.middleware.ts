import { NextFunction, Request, Response } from "express";
import { HttpException } from "@exceptions/HttpException";
import { validateToken } from "@/utils/Functions";

export const authorize = async function (req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.headers.authorization;
        const payload = validateToken(token);

        req['tokenPayload'] = payload;
        next();
    } catch (e) {
        if (e.opts?.title === 'invalid_token') {
            next(
                new HttpException(401, "Invalid Authorization Token"),
            );
        } else {
            console.log('Other error:', e);
            next(e);
        }
    }
};
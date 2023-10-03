import { Request, Response, NextFunction } from 'express';
import { UserModel } from '@/models/user.model';
import { HttpException } from '@/exceptions/HttpException';

export const permit = (allowedRoles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const payload = req['tokenPayload'];
        const userId = payload['id'];

        if (!userId) {
            return next(
                new HttpException(401, "Unauthorized"),
            );
        }

        try {
            const user = await UserModel.findById(userId);

            if (!user) {
                return next(
                    new HttpException(401, "User not found"),
                );
            }

            if (allowedRoles.includes(user.role)) {
                next();
            } else {
                next(
                    new HttpException(403, "Access Forbidden"),
                );
            }
        } catch (error) {
            next(
                new HttpException(500, "Internal Server Error"),
            );
        }
    };
};

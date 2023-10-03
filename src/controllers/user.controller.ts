import { Request, Response, NextFunction } from 'express';
import { UpdateUserDto } from '@/dtos/user.dto';
import { User } from '@/interfaces/user.interface';
import { UserService } from '@/services/user.service';
import { Container } from "typedi";

export class UserController {
    public user = Container.get(UserService);

    public getUsers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users: User[] = await this.user.getUsers();
            res.status(200).json({ data: users, message: "Users" });
        } catch (error) {
            next(error);
        }
    };

    public getUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const payload = req['tokenPayload'];
            const userId = payload['id'];
            const user: User = await this.user.getUser(userId);
            res.status(200).json({ data: user, message: "GetUser" });
        } catch (error) {
            next(error);
        }
    };

    public updateUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const payload = req['tokenPayload'];
            const userId = payload['id'];
            const data: UpdateUserDto = req.body;
            const updatedUser: User = await this.user.updateUser(userId, data);
            res.status(200).json({ data: updatedUser, message: 'Updated' });
        } catch (error) {
            next(error);
        }
    };

    public updatePicture = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const payload = req['tokenPayload'];
            const userId = payload['id'];
            const image = req.body;
            const updatedUser: User = await this.user.updatePicture(userId, image);
            res.status(200).json({ data: updatedUser, message: 'Updated' });
        } catch (error) {
            next(error);
        }
    };
}
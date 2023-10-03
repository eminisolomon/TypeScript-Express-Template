import { Router } from "express";
import { UserController } from "@controllers/user.controller";
import { Routes } from "@interfaces/routes.interface";
import { authorize, permit } from "@/middlewares";
import { UserRole } from "@/enums/user-role";

export class UserRoute implements Routes {
    public path = "/users";
    public router = Router();
    public user = new UserController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, authorize, permit([UserRole.ADMIN]), this.user.getUsers);
        this.router.get(`${this.path}`, authorize, this.user.getUser);
        this.router.put(`${this.path}`, authorize, this.user.updateUser);
        this.router.put(`${this.path}/avatar`, authorize, this.user.updatePicture);
    }
}
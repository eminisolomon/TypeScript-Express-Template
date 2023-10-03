import { Service } from "typedi";
import { HttpException } from "@/exceptions/HttpException";
import { User } from "@/interfaces/user.interface";
import { UserModel } from "@/models/user.model";
import { UpdateUserDto } from "@/dtos/user.dto";
import cloudinary from "@/config/cloudinary";

@Service()
export class UserService {
    public async getUsers(): Promise<User[]> {
        const users: User[] = await UserModel.find();

        if (!users || users.length === 0) {
            throw new HttpException(404, "No users found");
        }

        return users;
    }

    public async getUser(userId: string): Promise<User> {
        const user: User = await UserModel.findById(userId);

        if (!user) {
            throw new HttpException(404, "User not found");
        }

        return user;
    }

    public async updateUser(userId: string, data: UpdateUserDto): Promise<User> {
        const user: User = await UserModel.findById(userId);
        if (!user) {
            throw new HttpException(404, "User not found");
        }

        if (data.username && (await UserModel.findOne({ username: data.username }))?.id !== userId) {
            throw new HttpException(409, "Username already in use");
        }

        const updateUserData = {
            name: data.fullname,
            username: data.username,
            website: data.password
        };

        const updatedUser: User | null = await UserModel.findByIdAndUpdate(
            userId,
            { $set: updateUserData },
            { new: true }
        );

        if (!updatedUser) {
            throw new HttpException(404, "User not found");
        }

        return updatedUser;
    }

    public async updatePicture(userId: string, image: string): Promise<User> {
        const user = await UserModel.findById(userId);
        if (!user) {
            throw new HttpException(404, "User not found");
        }

        const uploadResult = await cloudinary.uploader.upload(image, {
            folder: 'user-pictures',
        });

        const updatedUser = await UserModel.findOneAndUpdate(
            { _id: userId },
            { image: uploadResult.secure_url },
            { new: true }
        );

        if (!updatedUser) {
            throw new HttpException(500, "Failed to update user picture");
        }

        return updatedUser;
    }
}
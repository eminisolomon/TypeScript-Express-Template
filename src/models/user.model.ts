import { UserRole } from "@/enums/user-role";
import { User } from "@/interfaces/user.interface";
import { Schema, model, Document } from "mongoose";

const UserSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    username: {
        type: String,
        unique: true
    },
    image: {
        type: String,
        default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&usqp=CAU',
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: Object.values(UserRole),
        default: UserRole.USER,
    },
    password: {
        type: String
    },
}, {
    timestamps: true
});

export const UserModel = model<User & Document>("User", UserSchema)
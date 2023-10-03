import { User } from "@/interfaces/user.interface";
import { generateJWT } from "./Functions";

export const userToken = async (user: User) => {
    const accessToken = generateJWT(
        {
            id: user._id,
            role: user.role,
            tokenType: 'access',
        },
        {
            issuer: user.phone,
            subject: user.phone,
            audience: 'root',
        },
    );

    return {
        accessToken: accessToken,
    };
};
import { DB_PASSWORD, DB_DATABASE, DB_USERNAME, DB_HOST } from "@config";
import { ConnectOptions } from "mongoose";

export const dbConnection = {
    url: `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.tinnxfh.mongodb.net/${DB_DATABASE}`,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as ConnectOptions,
};

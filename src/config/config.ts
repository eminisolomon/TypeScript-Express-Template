import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === "true";

export const {
    NODE_ENV,
    PORT,
    LOG_FORMAT,
    LOG_DIR,
    ORIGIN
} = process.env;

export const {
    DB_PASSWORD,
    DB_USERNAME,
    DB_DATABASE,
    DB_HOST,
    BASE_URL_DEVELOPMENT,
    BASE_URL_PRODUCTION,
} = process.env;

export const {
    REDIS_URI,
    REDIS_URI_DEV
} = process.env;

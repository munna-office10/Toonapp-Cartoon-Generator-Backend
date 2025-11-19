import dotenv from "dotenv";
dotenv.config();

export const constants = {
    PORT: process.env.PORT,
    AVATAR_FOLDER: process.env.AVATAR_FOLDER,
    ORIGINAL_FOLDER: process.env.ORIGINAL_FOLDER,
    REPLICATE_MODEL: process.env.REPLICATE_MODEL,
    REPLICATE_API_TOKEN: process.env.REPLICATE_API_TOKEN,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_SERVICE_ACCOUNT_PATH: process.env.FIREBASE_SERVICE_ACCOUNT_PATH,
    ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || process.env.ALLOED_ORIGIN,
}

export default constants;

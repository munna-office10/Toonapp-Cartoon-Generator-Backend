import admin from "firebase-admin";
import { constants } from "./constant.js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let bucket, firestore;

try {
    const serviceAccountPath = constants.FIREBASE_SERVICE_ACCOUNT_PATH ||
        join(__dirname, "../utils/serviceAccountKey.json");
    const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, "utf8"));
    const projectId = constants.FIREBASE_PROJECT_ID || serviceAccount.project_id;
    const storageBucket = constants.FIREBASE_STORAGE_BUCKET;

    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            storageBucket: storageBucket,
            projectId: projectId,
        });
    }

    firestore = admin.firestore();
    bucket = constants.FIREBASE_STORAGE_BUCKET
        ? admin.storage().bucket(constants.FIREBASE_STORAGE_BUCKET)
        : admin.storage().bucket();

    console.log("Firebase Admin initialized (Firestore & Storage)");
} catch (error) {
    console.error("Firebase initialization error:", error.message);
    process.exit(1);
}

export { bucket, firestore };

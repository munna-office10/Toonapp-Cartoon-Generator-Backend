import { bucket, firestore } from "../config/dbConnect.js";
import { constants } from "../config/constant.js";

const uploadBuffer = async (buffer, destinationPath, contentType = "image/png") => {
  if (!bucket) {
    throw new Error("Firebase Storage bucket is not initialized");
  }
  
  const file = bucket.file(destinationPath);
  const stream = file.createWriteStream({
    metadata: {
      contentType,
      metadata: { firebaseStorageDownloadTokens: Date.now().toString() }
    }
  });

  return new Promise((resolve, reject) => {
    stream.on("error", (err) => {
      if (err.code === 404 || err.message.includes("does not exist")) {
        reject(new Error(`Firebase Storage bucket "${bucket.name}" does not exist. Enable Storage in Firebase Console.`));
      } else {
        reject(new Error(`Upload failed: ${err.message}`));
      }
    });
    stream.on("finish", async () => {
      await file.makePublic().catch(() => {});
      const publicUrl = constants.FIREBASE_STORAGE_BASE_URL 
        ? `${constants.FIREBASE_STORAGE_BASE_URL}/${destinationPath}`
        : `https://storage.googleapis.com/${bucket.name}/${destinationPath}`;
      resolve({ publicUrl, path: destinationPath });
    });
    stream.end(buffer);
  });
}

const saveJobRecord = async (record) => {
  if (!firestore) {
    throw new Error("Firestore is not initialized");
  }
  const ref = firestore.collection("avatarJobs").doc();
  record.id = ref.id;
  record.createdAt = new Date();
  await ref.set(record);
  return record;
}

export { uploadBuffer, saveJobRecord };
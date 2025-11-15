import { bucket, firestore } from "../config/dbConnect.js";
import { AVATAR_FOLDER, ORIGINAL_FOLDER } from "../config/constant.js";

const uploadBuffer = async (buffer, destinationPath, contentType = "image/png") => {
  const file = bucket.file(destinationPath);
  const stream = file.createWriteStream({
    metadata: {
      contentType,
      metadata: { firebaseStorageDownloadTokens: Date.now().toString() }
    }
  });

  return new Promise((resolve, reject) => {
    stream.on("error", (err) => reject(err));
    stream.on("finish", async () => {
      // Make file publicly readable (optional: better to use signed URLs)
      await file.makePublic().catch(()=>{});
      const publicUrl = `https://storage.googleapis.com/${process.env.FIREBASE_STORAGE_BUCKET}/${destinationPath}`;
      resolve({ publicUrl, path: destinationPath });
    });
    stream.end(buffer);
  });
}

const saveJobRecord = async (record) => {
  const ref = firestore.collection("avatarJobs").doc();
  record.id = ref.id;
  record.createdAt = new Date();
  await ref.set(record);
  return record;
}

export { uploadBuffer, saveJobRecord };
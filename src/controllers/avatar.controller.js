// import { createAvatar } from "../services/replicate.service.js";
// import { uploadBuffer, saveJobRecord } from "../services/firebase.service.js";
// import { generateFilename } from "../utils/appUtils.js";
// import { AVATAR_FOLDER, ORIGINAL_FOLDER } from "../config/constant.js";
import { generateFilename } from "../utils/generateFile.js";
import { errorResponse } from "../utils/response.js";
import { constants } from "../config/constant.js";

const generateAvatarController = async (req, res, next) => {
    try {
        const userId = req.userId || req.header("x-device-id") || null;
        if (!req.file) {
            return errorResponse(res, 400, "Image is required");
        };
        // original buffer
        const originalBuffer = req.file.buffer; 

        const originalName = generateFilename("png");

        const originalPath = `${constants.ORIGINAL_FOLDER}/${originalName}`;


        // // Upload original to Firebase
        // const origUpload = await uploadBuffer(originalBuffer, originalPath, req.file.mimetype);

        // // Convert to base64 for Replicate (or provide URL if model accepts remote URL)
        // const base64 = originalBuffer.toString("base64");

        // // Call Replicate
        // const output = await createAvatar({ imageBase64: base64 });

        // // output could be an array of URLs or base64; handle common cases:
        // let avatarBuffer;
        // if (Array.isArray(output) && output.length > 0 && typeof output[0] === "string" && output[0].startsWith("http")) {
        //     // fetch URL and get buffer
        //     const fetch = (await import("node-fetch")).default;
        //     const r = await fetch(output[0]);
        //     avatarBuffer = Buffer.from(await r.arrayBuffer());
        // } else if (typeof output === "string" && output.startsWith("data:image")) {
        //     // data URL
        //     const b64 = output.split(",")[1];
        //     avatarBuffer = Buffer.from(b64, "base64");
        // } else if (Array.isArray(output) && output[0].startsWith("data:image")) {
        //     const b64 = output[0].split(",")[1];
        //     avatarBuffer = Buffer.from(b64, "base64");
        // } else {
        //     throw new Error("Unsupported Replicate output format. Debug: " + JSON.stringify(output).slice(0, 200));
        // }

        // const avatarName = generateFilename("png");
        // const avatarPath = `${AVATAR_FOLDER}/${avatarName}`;
        // const avatarUpload = await uploadBuffer(avatarBuffer, avatarPath, "image/png");

        // // Save job record to Firestore
        // const job = {
        //     userId,
        //     original: origUpload.publicUrl,
        //     avatar: avatarUpload.publicUrl,
        //     modelUsed: process.env.REPLICATE_MODEL || "replicate-default",
        //     status: "completed"
        // };

        // const saved = await saveJobRecord(job);

        // return res.json({ success: true, data: saved });
    } catch (err) {
        // next(err);
        return errorResponse(res, 500, err.message || "Internal server error");
    }
};

export { generateAvatarController };  
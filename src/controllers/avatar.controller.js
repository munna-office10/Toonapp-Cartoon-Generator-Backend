import { generateFilename } from "../utils/generateFile.js";
import { errorResponse } from "../utils/response.js";
import { constants } from "../config/constant.js";
import { uploadBuffer } from "../services/firebase.service.js";



const generateAvatarController = async (req, res, next) => {
    try {
        const originalBuffer = req.file.buffer;


        // Upload face to Firebase
        const faceName = generateFilename("png");
        const facePath = `${constants.ORIGINAL_FOLDER}/${faceName}`;

        const faceUpload = await uploadBuffer(originalBuffer, facePath);

        return res.json({
            success: true,
            message: "Face cropped successfully",
            data: {
                cropped: faceUpload.publicUrl,
                path: faceUpload.path
            }
        });
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
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const REPLICATE_TOKEN = process.env.REPLICATE_API_TOKEN;
const MODEL = process.env.REPLICATE_MODEL; // e.g. "catacols/cartoonify" - change accordingly

if (!REPLICATE_TOKEN) {
    console.warn("No Replicate token found. Set REPLICATE_API_TOKEN in .env");
}

/**
 * Send image (as base64 or url) to Replicate to create avatar.
 * You might need to adjust the body shape to fit the exact model's API.
 *
 * This function expects a Buffer or a URL (we'll send base64 inline).
 */
const createAvatar = async ({ imageBase64 }) => {
    // Example using the generic Replicate v1 Predictions endpoint.
    const body = {
        // model format varies; the exact input key depends on the model you choose.
        version: MODEL,
        input: {
            image: `data:image/png;base64,${imageBase64}`,
        },
    };

    const res = await fetch("https://api.replicate.com/v1/predictions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${REPLICATE_TOKEN}`,
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Replicate error: ${res.status} ${text}`);
    }

    const json = await res.json();

    // Many Replicate models are asynchronous — they give a prediction object with status 'processing' or a result URL.
    // For simplicity: poll until 'succeeded' and return result[0] or output URL.
    let prediction = json;
    const pollUrl = `https://api.replicate.com/v1/predictions/${prediction.id}`;

    // Poll loop
    while (prediction.status === "processing" || prediction.status === "starting") {
        await new Promise((r) => setTimeout(r, 1500));
        const p = await fetch(pollUrl, {
            headers: { Authorization: `Token ${REPLICATE_TOKEN}` },
        });
        prediction = await p.json();
    }

    if (prediction.status !== "succeeded") {
        throw new Error("Prediction failed: " + JSON.stringify(prediction));
    }

    // prediction.output may be array of URLs or base64. Adjust according to model
    return prediction.output; // caller will handle format
};

export { createAvatar };

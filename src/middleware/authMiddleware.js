import { errorResponse } from "../utils/response.js";
const attachUser = (req, res, next) => {
    req.userId = req.header("x-device-id") || req.body.userId || null;
    if (!req.userId) {
        return errorResponse(res, 401, "User ID / Device ID is required");
    }
    next();
}

export { attachUser };
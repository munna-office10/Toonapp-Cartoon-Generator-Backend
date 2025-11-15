import express from "express";
import cors from "cors";
import { successResponse } from "./utils/response.js";
import routes from "./routes/index.js";
import morgan from "morgan";
import { errorHandler } from "./middleware/errorHandler.js";
import { constants } from "./config/constant.js";

const app = express();
app.use(express.json());
app.use(cors(
    {
        origin: constants.ALLOED_ORIGIN,
        credentials: true,
    }
));

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", routes);


app.get("/health", (req, res) => {
    return res.json({ ok: true })
});


app.get("/", (req, res) => {
    return successResponse(res, 200, "ToonApp Cartoon Generator Backend is Running");
});

app.use(errorHandler);

export default app;
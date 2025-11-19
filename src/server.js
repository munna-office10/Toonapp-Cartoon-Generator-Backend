import "./config/dbConnect.js"; // Initialize Firebase (Firestore & Storage)
import { constants } from "./config/constant.js";
import app from "./app.js";

const { PORT } = constants;


const server = app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);

});




import connectDB from "./config/dbConnect.js";
import  { constants }  from "./config/constant.js";
const { PORT } = constants;
import app from "./app.js";


// Database Connection
// connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


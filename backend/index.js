import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config();

const app = express();



// ✅ UPDATED CORS CONFIG (IMPORTANT)
const corsOptions = {
    origin: [
        "http://localhost:5173", // local frontend default Vite port
        "http://localhost:5174", // Vite sometimes uses 5174 if 5173 is busy
        "https://mern-project-job-portal.onrender.com" // 🔥 replace later with real frontend URL
    ],
    credentials: true
};

app.use(cors(corsOptions));
// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

// api routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// ✅ Make sure DB connects BEFORE server starts
connectDB();

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});

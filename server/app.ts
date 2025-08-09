import express from "express";
import morgan from "morgan"; //a middleware that logs requests onto the console
const app = express();
import cookieParser from "cookie-parser";
import cors from "cors"; //prevents cors blockage

const allowedOrigins = [
    "http://localhost:5173", // Development Frontend
    "https://www.applicationclubmnnit.com", // Production Frontend
];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, origin);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true, // Required for cookies
    })
);

// read data from the body into req.body
app.use(express.json());

//to work with cookies
app.use(cookieParser());

//to print requests in log
app.use(morgan("dev"));

app.get("/", (req, res, next) => {
    res.status(200).json({
        status: "success",
        message: "Welcome to ApplicationClubMnnit.com Main server",
    });
});

app.get("/test", async (req, res, next) => {
    res.status(200).json({
        status: "success",
        message: "This is a test route.",
    });
});



//defining routers
// todo: routes here
import userRoutes from "./routes/userRouters";
import leadRoutes from "./routes/leadRouters";
import courseRoutes from "./routes/courseRoutes";
import teacherRoutes from "./routes/teacherRouters";
import paperRoutes from "./routes/paperRoutes";
import subjectRoutes from "./routes/subjectRoutes";

app.use("/user", userRoutes);
app.use("/lead", leadRoutes);


import seniorRoutes from "./routes/seniorRouters";
app.use("/seniors", seniorRoutes);

import leaderboardRoutes from "./routes/leaderboardroutes";
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/course", courseRoutes);
app.use("/teacher", teacherRoutes);
app.use("/paper", paperRoutes);
app.use("/subject", subjectRoutes);

//for undefined routs
import AppError from "./util/appError";

app.all("*", (req, res, next) => {
    next(
        new AppError(
            `Can't find ${req.originalUrl} on AC Website main server!`,
            404
        )
    );
});

//in case of operational error this middleware function will be called to return relevant error message
import globalErrorController from "./controllers/errorController";

app.use(globalErrorController);
export default app;

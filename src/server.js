import express from "express"
import { ENV } from "./config/env.js";
import { connetDB } from "./config/db.js";
import cors from "cors"
import {clerkMiddleware} from "@clerk/express"
import userRoutes from "./routes/user.route.js";
import { postRoute } from "./routes/post.route.js";
import { commentRoute } from "./routes/comment.route.js";
import router from "./routes/notifications.route.js";
import { arcjetMiddleware } from "./middleware/arcjet.middleware.js";
const app = express();

app.use(cors());
app.use(express.json())

app.use(clerkMiddleware());
app.use(arcjetMiddleware)


app.get("/", (req, res) => res.send("Hlo"))

app.use("/api/users",userRoutes)
app.use("/api/posts",postRoute)
app.use("/api/comments",commentRoute)
app.use("/api/notification",router)


//error handling middleware
app.use((err,req,res ,next)=>{
    console.log("Unhandled error" ,err);
    res.status(500).json({error:err.message || "Internal Server error"});
})

const startServer = async () => {
    try {
        await connetDB();
        if(ENV.NODE_ENV !== "production"){
        app.listen(ENV.PORT, () => console.log(`Server is running.. on ${ENV.PORT}`))
        }
    } catch (error) {
        console.error("Failed to start server", error.message);
        process.exit(1);
    }
}

startServer();

require('dotenv').config()

import express, { Request, Response } from "express"
import cors from "cors";
import cookieParser from "cookie-parser";


import db from "./models"

// user routes
import userRoutes from "./routes/user/userRoutes"
import subscriptionRoutes from "./routes/user/subscriptionRoutes"

// video routes
import videoRoutes from "./routes/video/videoRoutes"
import watchLaterRoutes from "./routes/video/watchLaterRoutes"
import watchHistoryRoutes from "./routes/video/watchHistoryRoutes"

import commentRoutes from "./routes/commentRoutes"

// google auth routes
import googleRoutes from "./routes/googleAuthRoutes"

// local auth routes
import localAuthRoutes from "./routes/localAuthRoutes"

import { verifyToken } from "./auth/util"

const app = express()

app.use(cors())
app.use(cookieParser())

// bodyparser
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use("/api/users", userRoutes)
app.use("/api/users/subscription", subscriptionRoutes)

app.use("/api/videos", videoRoutes)
app.use("/api/videos/later", watchLaterRoutes)
app.use("/api/videos/history", watchHistoryRoutes)

app.use("/api", commentRoutes)

app.use("/api", googleRoutes)
app.use("/api/auth", localAuthRoutes)

// app.use("/api", verifyToken, (req:Request, res:Response) => {
// 	res.json(req.user)
// })

const {
	PORT
} = process.env

db.sequelize.sync().then(() => {
	app.listen(PORT, () => console.log(`http://localhost:${PORT}/`))	
})
// db.sequelize.sync({force:true}).then(() => {
// 	app.listen(PORT, () => console.log(`http://localhost:${PORT}/`))	
// })

// app.listen(PORT, () => console.log(`http://localhost:${PORT}/`))	


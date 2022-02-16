require('dotenv').config()
import express, { Request, Response } from "express"
import cors from "cors";
import cookieParser from "cookie-parser";
import db from "./models"

import userRoutes from "./routes/user"
import videoRoutes from "./routes/video"
import commentRoutes from "./routes/comment"
// auth routes
import googleRoutes from "./routes/auth/googleAuthRoutes"
import localAuthRoutes from "./routes/auth/localAuthRoutes"

import insertInitialData from "./seeders/user"

const app = express()

app.use(cors())
app.use(cookieParser())

// bodyparser
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use("/api", googleRoutes)
app.use("/api/auth", localAuthRoutes)

app.use("/api/users", userRoutes)
app.use("/api/videos", videoRoutes)
app.use("/api/comments", commentRoutes)

const {
	PORT
} = process.env

db.sequelize.sync().then(() => {
	app.listen(PORT, () => console.log(`http://localhost:${PORT}/`))	
})
// db.sequelize.sync({force:true}).then(() => {
// 	insertInitialData()
// 	app.listen(PORT, () => console.log(`http://localhost:${PORT}/`))	
// })


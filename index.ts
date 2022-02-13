require('dotenv').config()

import express, { Request, Response } from "express"
import cors from "cors";
import cookieParser from "cookie-parser";


import db from "./models"

import userRoutes from "./routes/userRoutes"
import videoRoutes from "./routes/videoRoutes"
import commentRoutes from "./routes/commentRoutes"

// google auth routes
import googleRoutes from "./routes/googleAuthRoutes"

const app = express()

app.use(cors())
app.use(cookieParser())

// bodyparser
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use("/api", userRoutes)
app.use("/api", videoRoutes)
app.use("/api", commentRoutes)

app.use("/api", googleRoutes)

const {
	PORT
} = process.env

// db.sequelize.sync().then(() => {
// 	app.listen(PORT, () => console.log(`http://localhost:${PORT}/`))	
// })
db.sequelize.sync({force:true}).then(() => {
	app.listen(PORT, () => console.log(`http://localhost:${PORT}/`))	
})

// app.listen(PORT, () => console.log(`http://localhost:${PORT}/`))	


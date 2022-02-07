require('dotenv').config()

import express, { Request, Response } from "express"

import db from "./models"

import userRoutes from "./routes/userRoutes"
import videoRoutes from "./routes/videoRoutes"
import commentRoutes from "./routes/commentRoutes"
import testRoutes from "./routes/testRoutes"

const app = express()

// bodyparser
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use("/api", userRoutes)
app.use("/api", videoRoutes)
app.use("/api", commentRoutes)
app.use("/api", testRoutes)

const {
	PORT
} = process.env

db.sequelize.sync().then(() => {
	app.listen(PORT, () => console.log(`http://localhost:${PORT}/`))	
})


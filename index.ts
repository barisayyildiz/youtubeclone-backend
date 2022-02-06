require('dotenv').config()

import express, { Request, Response } from "express"
// import userRouter from "./routes/userRoutes"
// import videoRouter from "./routes/videoRoutes"
// import subsRouter from "./routes/subscriptionRoutes"

// const db = require("./models/index.js")
import db from "./models"
import { users } from "./seeders/users"
import { projects } from "./seeders/projects"
import { projectsAssignments } from "./seeders/projectAssignment"

import userRoutes from "./routes/userRoutes"
import videoRoutes from "./routes/videoRoutes"
import commentRoutes from "./routes/commentRoutes"

const app = express()

// bodyparser
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use("/api", userRoutes)
app.use("/api", videoRoutes)
app.use("/api", commentRoutes)

const {
	PORT
} = process.env

db.sequelize.sync().then(() => {
	app.listen(PORT, () => console.log(`http://localhost:${PORT}/`))	
})


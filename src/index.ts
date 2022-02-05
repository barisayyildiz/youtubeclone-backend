require('dotenv').config()

import express, { Request, Response } from "express"
import userRouter from "./routes/userRoutes"
import videoRouter from "./routes/videoRoutes"

const app = express()

// bodyparser
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


app.use("/api", userRouter)
app.use("/api", videoRouter)


const {
	PORT
} = process.env

app.listen(PORT, () => console.log(`http://localhost:${PORT}/`))

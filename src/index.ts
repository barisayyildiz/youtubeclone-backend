require('dotenv').config()

import express, { Request, Response } from "express"
import userRouter from "./routes/userRoutes"

const app = express()

// bodyparser
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


app.use("/api", userRouter)


const {
	PORT
} = process.env

app.listen(PORT, () => console.log(`http://localhost:${PORT}/`))

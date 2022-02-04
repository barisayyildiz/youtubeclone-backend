require('dotenv').config()

import express, { Request, Response } from "express"
import UserModel from './models/User'

const app = express()

const {
	PORT
} = process.env


app.listen(PORT, () => console.log(`http://localhost:${PORT}/`))

import express, { NextFunction, Request, Response } from "express"
import bcrypt from "bcrypt"
import db from "../../models"
import { verifyAdmin, verifyToken } from "../../auth/util"
import { 
	signUp,
	login,
	logout
} from "../../controllers/localAuth"

const router = express.Router()

// signup
router.post("/signup", signUp)

// login
router.post("/login", login)

// logout
router.post("/logout", verifyToken, logout)


export default router

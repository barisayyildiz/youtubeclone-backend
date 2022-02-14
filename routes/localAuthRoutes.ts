require('dotenv').config()
import express, { Request, Response } from "express"
import db from "../models"
import bcrypt from "bcrypt"
import { signJWT, passwordCompare, verifyToken } from "../auth/util"
import { Op } from "sequelize"

const {
	COOKIE_NAME
} = process.env

const router = express.Router()

router.post("/signup", async(req:Request, res:Response) => {
	try{

		const { username, email, password } = req.body

		// kullanıcı var mı kontrol
		const user = await db.User.findOne({
			where: {
				[Op.or]: [{username},{email}]
			}
		})

		if(user){
			res.json({
				msg:"user is already registered"
			})
		}

		const salt = await bcrypt.genSalt()
		const hashed = await bcrypt.hash(password, salt)
				
		// yeni kullanıcı oluştur
		const newUser = await db.User.create({
			...req.body,
			password:hashed
		})
		res.json(newUser)
	
	}catch(error){
		console.log(error)
		res.json(error)
	}
})


router.post("/login", async (req:Request, res:Response) => {
	try{
		const {username, password} = req.body
		
		const user = await db.User.findOne({
			where:{
				username:username
			}
		})

		if(!user){
			res.status(404).json({
				msg:'user not found'
			})
		}

		const matching = await passwordCompare(password, user.password)
		
		if(!matching){
			return res.json({
				msg:'password is incorrect'
			})
		}

		const token = signJWT(user)
		res.cookie(COOKIE_NAME!, token, {
			maxAge: 900000,
			httpOnly: true,
			secure: false,
		});

		res.json({
			token
		})

	}catch(error){
		console.log(error)
		res.json(error)
	}
})


router.post("/logout", verifyToken, (req:Request, res:Response) => {
	res.clearCookie(COOKIE_NAME!);
	res.json({
		msg:'user logged out'
	})
})


export default router

require('dotenv').config()
import { Request, Response, NextFunction } from "express"
import db from "../models"
import { Op } from "sequelize"
import { signJWT, passwordCompare, verifyToken } from "../auth/util"
import bcrypt from "bcrypt"

const {
	COOKIE_NAME
} = process.env

export const signUp = async (req:Request, res:Response, next:NextFunction) => {
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
}

export const login = async (req:Request, res:Response, next:NextFunction) => {
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
}

export const logout = async (req:Request, res:Response, next:NextFunction) => {
	res.clearCookie(COOKIE_NAME!);
	res.json({
		msg:'user logged out'
	})
}


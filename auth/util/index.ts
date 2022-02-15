require('dotenv').config()
import jwt from "jsonwebtoken"
import db from "../../models"
import bcrypt from "bcrypt"
import { Request, Response, NextFunction } from 'express';

declare global{
	namespace Express{
		interface Request{
			user:any;
			token:string;
		}
	}
}

interface UserIDJwtPayload extends jwt.JwtPayload {
	userId: string
}

const User = db.User

const {
	JWT_SECRET_KEY,
} = process.env

export function signJWT(user:typeof User):string{
	const {
		id,
		username,
		email
	} = user
	return jwt.sign({
		id,
		username,
		email
	}, JWT_SECRET_KEY!)
}

export function passwordCompare(plaintext:string, hashed:string):Promise<boolean>{
	return new Promise((resolve, reject) => {
		bcrypt.compare(plaintext, hashed, (err, res) => {
			if(err){
				reject(err)
			}else{
				resolve(res)
			}
		})
	})
}

export async function verifyToken(req:Request, res:Response, next:NextFunction){
	try{
		const bearerHeader = req.headers['authorization'];
		if(bearerHeader){
			const bearer = bearerHeader.split(' ');
			const bearerToken = bearer[1];
			req.token = bearerToken;
			
			// get user
			const decoded = <UserIDJwtPayload>jwt.verify(bearerToken, JWT_SECRET_KEY!)
			const user = await db.User.findOne({
				where:{
					id:decoded.id
				},
				attributes:[
					"id",
					"username",
					"email",
					"googleId",
					"isAdmin"
				]
			})
			if(!user){
				res.status(400).json({
					msg:'user not found'
				})
			}

			req.user = user
		
			next();
		}else{
			res.status(403).json({
				msg:'user not logged in'
			})
		}
	}catch(error){
		res.status(400).json(error)
	}
}

export function verifyAdmin(req:Request, res:Response, next:NextFunction){
	if(req.user.isAdmin){
		next()
	}else{
		return next({
			msg:'authorization denied, only for admins!'
		})
	}
}

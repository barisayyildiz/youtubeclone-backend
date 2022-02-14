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

export function verifyToken(req:Request, res:Response, next:NextFunction){
	try{
		const bearerHeader = req.headers['authorization'];
		if(bearerHeader){
			const bearer = bearerHeader.split(' ');
			const bearerToken = bearer[1];
			req.token = bearerToken;
			req.user = jwt.verify(bearerToken, JWT_SECRET_KEY!)
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

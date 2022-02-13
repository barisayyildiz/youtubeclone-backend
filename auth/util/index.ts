require('dotenv').config()
import jwt from "jsonwebtoken"
import db from "../../models"
import bcrypt from "bcrypt"

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


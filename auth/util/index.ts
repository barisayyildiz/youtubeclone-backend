require('dotenv').config()
import jwt from "jsonwebtoken"
import db from "../../models"

const User = db.User

const {
	JWT_SECRET_KEY,
} = process.env

export function signJWT(user:typeof User):string{
	const {
		username,
		email
	} = user
	return jwt.sign({
		username,
		email
	}, JWT_SECRET_KEY!)
}


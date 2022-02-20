require('dotenv').config()
import express, { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { v4 as uuidv4 } from "uuid"
import { getGoogleAuthUrl, oauth2Client, getGoogleUser } from "../../auth/google"
import db from "../../models"

const {
	GOOGLE_CLIENT_REDIRECT : redirectUri,
	JWT_SECRET_KEY,
	COOKIE_NAME,
	SERVER_ROOT
} = process.env

const router = express.Router()

// frontendin bağlanacağı endpoint
// bu endpoint google auth formuna yönlendiriyor
router.get("/googleurl", (req:Request, res:Response) => {
	console.log(redirectUri)
	res.redirect(getGoogleAuthUrl())
})

// form doldurulduktan sonra buraya yönlendiriliyor
// google auth redirect
router.get(`/${redirectUri}`, async (req:Request, res:Response) => {

	const code:string = String(req.query.code)
	const response = await oauth2Client.getToken(code)
	const googleUser = await getGoogleUser(response.tokens)

	const { 
		id:googleId,
		name:username,
		email,
		picture:avatar
	} = googleUser 

	// google hesabı ile giriş yapan kullanıcı sistemde kayıtlı mı	
	let user = await db.User.findOne({
		where:{
			googleId
		}
	})

	// kullanıcı kayıtlı değilse yeni kullanıcı oluştur
	if(!user){
		user = await db.User.create({
			username,
			email,
			password:uuidv4(), // unique value,
			googleId,
			avatar
		})
	}

	// const token = jwt.sign(googleUser, JWT_SECRET_KEY!)
	const token = jwt.sign({
		id:user.id,
		username:user.username,
		email:user.email
	}, JWT_SECRET_KEY!)
	
	res.cookie(COOKIE_NAME!, token, {
    maxAge: 900000,
    httpOnly: true,
    secure: false,
  });

	res.redirect(SERVER_ROOT!)
})


export default router

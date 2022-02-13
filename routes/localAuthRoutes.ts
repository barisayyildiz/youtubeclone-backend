import express, { Request, Response } from "express"
import db from "../models"
import bcrypt from "bcrypt"

const router = express.Router()

router.post("/signup", async(req:Request, res:Response) => {
	try{

		const { username, email, password } = req.body

		// kullanıcı var mı kontrol
		const user = await db.User.findOne({
			where:{
				$or:[
					{
						username:{
							$eq: username
						}
					},
					{
						email:{
							$eq: email
						}
					}
				]
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
		res.json(error)
	}
})


router.post("/login", async (req:Request, res:Response) => {

})




export default router


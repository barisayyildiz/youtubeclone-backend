import express, { Request, Response } from "express"
import db from "../models"

const router = express.Router()

router.get("/signup", async(req:Request, res:Response) => {
	try{

		const { username, email } = req.body

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
		
		// yeni kullanıcı oluştur
		const newUser = await db.User.create({
			...req.body
		})
		res.json(newUser)
	
	}catch(error){
		res.json(error)
	}
})




export default router


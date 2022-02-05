import express, { Request, Response } from "express"
import SubscriptionModel from "../models/Subscription"
import UserModel from "../models/User"
import VideoModel from "../models/Videos"

import sequelize from "../db"

const router = express.Router()

router.get("/subscription/to/:id", async (req:Request, res:Response) => {
	try{
		const users = await SubscriptionModel.findAll({
			include:[
				{
					model: UserModel					
				}
			],			
			where:{
				subscriber:req.params.id
			}
		})
		res.json(users)
	}catch(error){
		res.json(error)
	}
})

export default router

import { Request, Response, NextFunction } from "express"
import db from "../models"

export const getUserById = async (id:string, req:Request, res:Response, next:NextFunction) => {
	try{
		const user:any = await db.User.findOne({
			where:{
				id
			},			
			include:[
				{
					model:db.Video,
				}
			]
		})
		res.json(user)		
	}catch(error){
		res.json(error)
	}
}

export const updateUserProfile = async (req:Request, res:Response, next:NextFunction) => {
	try{
		const user:any = await db.User.findByPk(req.user.id)
		user.set({
			...req.body
		})
		await user.save()
		res.json(user)
	}catch(error){
		res.json(error)
	}
}

export const getSubscribedChannels = async (id:any, req:Request, res:Response, next:NextFunction) => {
	console.log("id : ", id)
	try{
		const subscribed = await db.Subscription.findAll({
			include:[{
				model:db.User,
				as:"subscribed"
			}],
			where:{
				SubscriberId:id
			},
			attributes:[
				"id",
				"createdAt",
				"updatedAt",
				"Subscription.SubscriberId"
			]
		})
		res.json(subscribed)
	}catch(error){
		console.log(error)
		res.json(error)
	}
}

export const toggleSubscription = async (req:Request, res:Response, next:NextFunction) => {
	try{
		let subscription = await db.Subscription.findOne({
			where:{
				SubscriberId:req.user.id,
				SubscribedId:req.params.id
			}
		})
		// no subscription
		if(!subscription){
			subscription = await db.Subscription.create({
				SubscriberId:req.user.id,
				SubscribedId:req.params.id
			})
			res.json(subscription)
		}else{
			await subscription.destroy()
			res.json({
				msg:'subscription deleted'
			})
		}
	}catch(error){
		console.log(error)
		res.json(error)
	}
}



import { Request, Response, NextFunction } from "express"
import db from "../models"
import bcrypt from "bcrypt"


export const getUserById = async (id:string, req:Request, res:Response, next:NextFunction) => {
	try{
		const user:any = await db.User.findByPk(id)
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

// export async function getAllUsers(){
// 	const users:any = await db.User.findAll()
// 	return users
// }

// export async function getUserById(id:string){
// 	const user:any = await db.User.findByPk(id)
// 	return user
// }

// export async function getUserByIdWithVideos(id:string){
// 	const user:any = await db.User.findAll({
// 		include:{
// 			model:db.Video,
// 			where:{
// 				UserId:id
// 			},
// 			attributes:{
// 				exclude:[
// 					"UserId",
// 				]
// 			}
// 		}
// 	})
// 	return user
// }

// export async function getUserByIdWithComments(id:string){
// 	const user:any = await db.User.findAll({
// 		include:{
// 			model:db.Comment,
// 		},
// 		where:{
// 			id:id
// 		}
// 	})
// 	return user
// }

// export async function createUser(params:any){
// 	const { password } = params
// 	const salt = await bcrypt.genSalt()
// 	const hashed = await bcrypt.hash(password, salt)
// 	const user:any = await db.User.create({
// 		...params,
// 		password:hashed
// 	})
// 	return user
// }

// export async function updateUser(id:string, params:any){
// 	const user = await db.User.findByPk(id)
// 	user.set({
// 		...params
// 	})
// 	await user.save()
// 	return user
// }

// export async function deleteUser(id:string){
// 	const user = await db.User.findByPk(id)
// 	await user.destroy()
// }


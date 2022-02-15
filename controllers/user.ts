import { Request, Response, NextFunction } from "express"
import db from "../models"
import bcrypt from "bcrypt"


export async function getAllUsers(){
	const users:any = await db.User.findAll()
	return users
}

export async function getUserById(id:string){
	const user:any = await db.User.findByPk(id)
	return user
}

export async function getUserByIdWithVideos(id:string){
	const user:any = await db.User.findAll({
		include:{
			model:db.Video,
			where:{
				UserId:id
			},
			attributes:{
				exclude:[
					"UserId",
				]
			}
		}
	})
	return user
}

export async function getUserByIdWithComments(id:string){
	const user:any = await db.User.findAll({
		include:{
			model:db.Comment,
		},
		where:{
			id:id
		}
	})
	return user
}

export async function createUser(params:any){
	const { password } = params
	const salt = await bcrypt.genSalt()
	const hashed = await bcrypt.hash(password, salt)
	const user:any = await db.User.create({
		...params,
		password:hashed
	})
	return user
}

export async function updateUser(id:string, params:any){
	const user = await db.User.findByPk(id)
	user.set({
		...params
	})
	await user.save()
	return user
}

export async function deleteUser(id:string){
	const user = await db.User.findByPk(id)
	await user.destroy()
}


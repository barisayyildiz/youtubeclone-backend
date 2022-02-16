import { Request, Response, NextFunction, response } from "express"
import db from "../models"

export const getVideoById = async (req:Request, res:Response, next:NextFunction) => {
	try{
		const video = await db.Video.findOne({
			where:{
				id:req.params.id
			},
			include:[{
				model:db.Comment,
			},
			{
				model:db.User,
				as:'user'				
			}]
		})
		res.json(video)
	}catch(error){
		console.log(error)
		res.json(error)
	}
}

export const createVideo = async (req:Request, res:Response, next:NextFunction) => {
	try{
		const video = await db.Video.create({
			...req.body,
			UserId:req.user.id
		})
		res.json(video)
	}catch(error){
		res.json(error)
	}
}

export const getVideosByUserId = async (UserId:string, req:Request, res:Response, next:NextFunction) => {
	try{
		const videos = await db.Video.findAll({
			where:{
				UserId
			}
		})
		res.json(videos)
	}catch(error){
		res.json(error)
	}
}

export const removeVideo = async (req:Request, res:Response, next:NextFunction) => {
	try{
		const video = await db.Video.findByPk(req.params.id)		
		if(video.UserId !== req.user.id){
			res.status(401).json({
				msg:'video kullanıcıya ait değil'
			})
		}else{
			await video.destroy()
			res.json({
				msg:"user successfully removed"
			})
		}
	}catch(error){
		res.json(error)
	}
}

export const updateVideo = async (req:Request, res:Response, next:NextFunction) => {
	try{
		const video = await db.Video.findByPk(req.params.id)
		if(video.UserId !== req.user.id){
			res.status(401).json({
				msg:'video kullanıcıya ait değil'
			})
		}
		video.set({
			...req.body
		})
		await video.save()
		res.json(video)
	}catch(error){
		res.json(error)
	}
}

export const addToWatchLater = async (req:Request, res:Response, next:NextFunction) => {
	try{
		let later = await db.WatchLater.findOne({
			where:{
				UserId:req.user.id,
				VideoId:req.body.VideoId
			}
		})
		if(later){
			return res.json({
				msg:'watch later pair already exists'
			})
		}
		later = await db.WatchLater.create({
			...req.body,
			UserId:req.user.id
		})
		res.json(later)
	}catch(error){
		res.json(error)
	}
}


export const getWatchLaterList = async (req:Request, res:Response, next:NextFunction) => {
	
	console.log("user.id : ", req.user.id)
	try {
		const laters = await db.WatchLater.findAll({
			include:[{
				model:db.Video,
				as:"video"
			}],			
			where:{
				UserId:req.user.id
			},
			attributes:{
				exclude:[
					"UserId",
					"VideoId",
				]
			}
		})
		res.json(laters)
	} catch (error) {
		// console.log(error)
		res.json(error)
	}
}

export const removeFromWatchLater = async (req:Request, res:Response, next:NextFunction) => {
	try {
		const later = await db.WatchLater.findByPk(req.params.id)
		await later.destroy()
		res.json({
			msg:"successfully removed from watch later"
		})
	} catch (error) {
		res.json(error)
	}
}



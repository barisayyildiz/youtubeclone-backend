import { Request, Response, NextFunction } from "express"
import db from "../models"
import cloudinary from "../config/cloudinary"
import fs from "fs"

interface MulterRequest extends Request{
	file?:any;
}

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

export const createVideo = async (req:MulterRequest, res:Response, next:NextFunction) => {
	try{
		console.log(req.body)
		console.log(req.file)
		const { path, filename } = req.file

		// upload video
		const result = await cloudinary.uploader.upload(path, {
			folder:'videos',
			resource_type: "video"
		})

		// remove file from disk
		await fs.promises.unlink(`./uploads/${filename}`)

		const video  = await db.Video.create({
			...req.body,
			url:result.url,
			cloudinaryId:result.public_id,
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
			const cloudinaryId = video.cloudinaryId
			// remove from postgres
			await video.destroy()

			// remove from cloudinary
			cloudinary.uploader
			.destroy(cloudinaryId,{
				folder:'videos',
				resource_type:'video'
			})
				// upload image here
			.then((result:any) => {
				res.status(200).send({
					message:'video successfully removed',
					result
				})
			})
			.catch((error:any) => {
				res.status(500).send({
					message: "removed from database not from cloudinary",
					error,
				});
			});
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

export const toggleVideoLike = async (req:Request, res:Response, next:NextFunction) => {
	try{
		let videoLike = await db.VideoLike.findOne({
			where:{
				UserId:req.user.id,
				VideoId:req.params.id
			}
		})
		let videoDislike = await db.VideoDislike.findOne({
			where:{
				UserId:req.user.id,
				VideoId:req.params.id
			}
		})
		
		// remove dislike if exists
		if(videoDislike){
			await videoDislike.destroy()
		}

		if(!videoLike){
			console.log("path1")
			videoLike = await db.VideoLike.create({
				VideoId:req.params.id,
				UserId:req.user.id
			})
			res.json(videoLike)
		}else{
			console.log("path2")
			await videoLike.destroy()
			res.json({
				msg:'video like removed'
			})
		}

	}catch(error){
		res.json(error)
	}
}

export const toggleVideoDislike = async (req:Request, res:Response, next:NextFunction) => {
	try{
		let videoLike = await db.VideoLike.findOne({
			where:{
				UserId:req.user.id,
				VideoId:req.params.id
			}
		})
		let videoDislike = await db.VideoDislike.findOne({
			where:{
				UserId:req.user.id,
				VideoId:req.params.id
			}
		})
		
		// remove dislike if exists
		if(videoLike){
			await videoLike.destroy()
		}

		if(!videoDislike){
			videoDislike = await db.VideoDislike.create({
				VideoId:req.params.id,
				UserId:req.user.id
			})
			res.json(videoDislike)
		}else{
			await videoDislike.destroy()
			res.json({
				msg:'video dislike removed'
			})
		}

	}catch(error){
		res.json(error)
	}
}


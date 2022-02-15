import { Request, Response, NextFunction } from "express"
import db from "../models"

export const createComment = async (req:Request, res:Response, next:NextFunction) => {
	try {
		const comment = await db.Comment.create({
			...req.body,
			UserId:req.user.id
		})
		res.json(comment)
	} catch (error) {
		res.json(error)
	}
}

export const getCommentById = async (req:Request, res:Response, next:NextFunction) => {
	try {
		const comment = await db.Comment.findByPk(req.params.id)
		res.json(comment)
	} catch (error) {
		res.json(error)
	}
}


export const getCommentsByVideo = async (req:Request, res:Response, next:NextFunction) => {
	try {
		const comments = await db.Comment.findAll({
			include:[{
				model:db.User,
				required:true,
				as:"user",
			}],
			where:{
				VideoId:req.params.id
			},
			attributes:{
				exclude:[
					"VideoId",
					"UserId",
				]
			}
		})
		res.json(comments)
	} catch (error) {
		console.log(error)
		res.json(error)
	}
}

export const deleteComment = async (req:Request, res:Response, next:NextFunction) => {
	try {
		const comment = await db.Comment.findByPk(req.params.id)
		if(comment.UserId !== req.user.id){
			res.status(401).json({
				msg:'yorum kullanıcıya ait değil'
			})
		}else{
			await comment.destroy()
			res.json({
				msg:"comment successfully removed"
			})
		}
	} catch (error) {
		res.json(error)
	}
}

export const updateComment = async (req:Request, res:Response, next:NextFunction) => {
	try {
		const comment = await db.Comment.findByPk(req.params.id)
		if(comment.UserId !== req.user.id){
			res.status(401).json({
				msg:'yorum kullanıcıya ait değil'
			})
		}else{
			comment.set({
				...req.body
			})
			await comment.save()
			res.json(comment)
		}
	} catch (error) {
		res.json(error)
	}
}






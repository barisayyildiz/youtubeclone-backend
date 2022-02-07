import express, { Request, Response } from "express"
import db from "../models"

const router = express()

router.get("/comments", async (req:Request, res:Response) => {
	try {
		const comments = await db.Comment.findAll()
		res.json(comments)
	} catch (error) {
		res.json(error)
	}
})

router.post("/comment", async (req:Request, res:Response) => {
	try {
		const comment = await db.Comment.create({
			...req.body
		})
		res.json(comment)
	} catch (error) {
		res.json(error)
	}
})

router.get("/comment/:id", async (req:Request, res:Response) => {
	try {
		const comment = await db.Comment.findByPk(req.params.id)
		res.json(comment)
	} catch (error) {
		res.json(error)
	}
})

router.put("/comment/:id", async (req:Request, res:Response) => {
	try {
		const comment = await db.Comment.findByPk(req.params.id)
		comment.set({
			...req.body
		})
		await comment.save()
		res.json(comment)
	} catch (error) {
		res.json(error)
	}
})

router.delete("/comment/:id", async (req:Request, res:Response) => {
	try {
		const comment = await db.Comment.findByPk(req.params.id)
		await comment.destroy()
		res.json({
			msg:"comment successfully removed"
		})
	} catch (error) {
		res.json(error)
	}
})

router.get("/comments/user/:id", async (req:Request, res:Response) => {
	try {
		const comments = await db.Comment.findAll({
			include:[{
				model:db.Video,
				required:true,
				as:"video"
			}],
			where:{
				UserId:req.params.id
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
})

router.get("/comments/video/:id", async (req:Request, res:Response) => {
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
})


export default router


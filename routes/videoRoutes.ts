import express, { Request, Response } from "express"
import db from "../models"

const router = express.Router()

router.get("/videos", async (req:Request, res:Response) => {
	try{
		const videos = await db.Video.findAll()
		res.json(videos)
	}catch(error){
		res.json(error)
	}
})

router.get("/video/:id", async (req:Request, res:Response) => {
	try{
		const video = await db.Video.findByPk(req.params.id)
		res.json(video)
	}catch(error){
		res.json(error)
	}
})

router.post("/video", async (req:Request, res:Response) => {
	try{
		const video = await db.Video.create({
			...req.body
		})
		res.json(video)
	}catch(error){
		res.json(error)
	}
})

router.put("/video/:id", async (req:Request, res:Response) => {
	try{
		const video = await db.Video.findByPk(req.params.id)
		video.set({
			...req.body
		})
		await video.save()
		res.json(video)
	}catch(error){
		res.json(error)
	}
})

router.delete("/video/:id", async (req:Request, res:Response) => {
	try{
		const video = await db.Video.findByPk(req.params.id)
		await video.destroy()
		res.json({
			msg:"user successfully removed"
		})
	}catch(error){
		res.json(error)
	}
})

export default router

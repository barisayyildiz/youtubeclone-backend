import express, { Request, Response } from "express"
import VideoModel from "../models/Videos"

const router = express.Router()

// get a single video by pk
router.get("/video/:id", async (req:Request, res:Response) => {
	const { id } = req.params
	try {
		const video = await VideoModel.findByPk(id)
		res.json(video)
	} catch (error) {
		res.json(error)
	}
})

// get all videos by user id
router.get("/videos/user/:id", async (req:Request, res:Response) => {
	const { id } = req.params
	try{
		const videos = await VideoModel.findAll({
			where:{
				ownerid:id
			}
		})
		res.json(videos)
	} catch(error){
		res.json(error)
	}
})

// create a video
router.post("/video", async (req:Request, res:Response) => {
	try{
		const video = VideoModel.build({
			...req.body
		})
		
		try{
			await video.save()
			res.json(video)
		}catch(error){
			res.json(error)
		}
		

	}catch(error){
		res.json(error)
	}
})

// delete a video
router.delete("/video/:id", async (req:Request, res:Response) => {
	const { id } = req.params
	try{
		const video = await VideoModel.findByPk(id)

		if(video){
			video.destroy()
			return res.json({
				msg:"video deleted successfully"
			})
		}
		res.json({
			msg:"video not found"
		})

	}catch(error){
		res.json(error)
	}
})

// update a video
router.put("/video/:id", async (req:Request, res:Response) => {
	const { id } = req.params
	try {
		const video = await VideoModel.findByPk(id)

		if(video){
			video.set({
				...req.body
			})
			video.save()
		}
		return res.json(video)

	} catch (error) {
		res.json(error)
	}
})


export default router

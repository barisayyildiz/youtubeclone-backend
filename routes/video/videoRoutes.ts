import express, { Request, Response } from "express"
import { verifyToken } from "../../auth/util"
import db from "../../models"

const router = express.Router()

router.get("/", async (req:Request, res:Response) => {
	try{
		const videos = await db.Video.findAll()
		res.json(videos)
	}catch(error){
		res.json(error)
	}
})

router.get("/:id", async (req:Request, res:Response) => {
	try{
		const video = await db.Video.findByPk(req.params.id)
		res.json(video)
	}catch(error){
		res.json(error)
	}
})

router.post("/", async (req:Request, res:Response) => {
	try{
		const video = await db.Video.create({
			...req.body
		})
		res.json(video)
	}catch(error){
		res.json(error)
	}
})

router.put("/:id", async (req:Request, res:Response) => {
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

router.delete("/:id", async (req:Request, res:Response) => {
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

router.get("/user/:id", async (req:Request, res:Response) =>  {
	try{
		const videos = await db.Video.findAll({
			where:{
				UserId:req.params.id
			}
		})
		res.json(videos)
	}catch(error){
		res.json(error)
	}
})

router.get("/subscribed/:id", async (req:Request, res:Response) => {
	try {
		const videos = await db.Subscription.findAll({
			include:{
				model:db.User,
				as:"subscribed",
				include:{
					model: db.Video
				}
			},
			attributes:[
				"Subscription.SubscriberId"
			],
			where:{
				SubscriberId:req.params.id
			},
		})
		res.json(videos)
	} catch (error) {
		console.log(error)
		res.json(error)
	}
})


export default router

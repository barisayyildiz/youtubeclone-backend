import express, { Request, Response } from "express"
import db from "../models"

const router = express.Router()

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

export default router

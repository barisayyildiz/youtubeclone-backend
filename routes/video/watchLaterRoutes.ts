import express, { Request, Response } from "express"
import db from "../../models"
import { verifyToken } from "../../auth/util"

const router = express.Router()

router.post("/", async (req:Request, res:Response) => {
	try{
		const later = await db.WatchLater.create({
			...req.body
		})
		res.json(later)
	}catch(error){
		res.json(error)
	}
})

router.get("/:id", async (req:Request, res:Response) => {
	try {
		const laters = await db.WatchLater.findAll({
			include:[{
				model:db.Video,
				as:"video"
			}],			
			where:{
				UserId:req.params.id
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
		res.json(error)
	}
})

router.get("/", verifyToken, async (req:Request, res:Response) => {
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
		console.log(error)
		res.json(error)
	}
})

router.delete("/:id", async (req:Request, res:Response) => {
	try {
		const later = await db.WatchLater.findByPk(req.params.id)
		await later.destroy()
		res.json({
			msg:"successfully removed from watch later"
		})
	} catch (error) {
		res.json(error)
	}
})



export default router

import express, { Request, Response } from "express"
import db from "../../models"

const router = express.Router()

router.post("/", async (req:Request, res:Response) => {
	try {
		const history = await db.WatchHistory.create({
			...req.body
		})
		res.json(history)
	} catch (error) {
		res.json(error)
	}
})

router.get("/:id", async (req:Request, res:Response) => {
	try {
		const history = await db.WatchHistory.findAll({
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
		res.json(history)
	} catch (error) {
		res.json(error)
	}
})

export default router

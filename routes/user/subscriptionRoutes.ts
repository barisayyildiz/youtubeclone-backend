import express, { Request, Response } from "express"
import db from "../../models"

const router = express.Router()

router.post("/", async (req:Request, res:Response) => {
	console.log(req.body)
	try {
		const sub = await db.Subscription.create({
			...req.body
		})
		res.json(sub)
	} catch (error) {
		console.log(error)
		res.json(error)
	}
})

router.get("/:id", async (req:Request, res:Response) => {
	try {
		const subscribed = await db.Subscription.findAll({
			include:[{
				model:db.User,
				as:"subscribed"
			}],
			where:{
				SubscriberId:req.params.id
			},
			attributes:[
				"id",
				"createdAt",
				"updatedAt",
				"Subscription.SubscriberId"
			]
		})
		res.json(subscribed)
	} catch (error) {
		console.log(error)
		res.json(error)
	}
})

router.delete("/:id", async (req:Request, res:Response) => {
	try{
		const subscription = await db.Subscription.findByPk(req.params.id)
		await subscription.destroy()
		res.json({
			msg:'subscription removed'
		})
	}catch(error){
		res.json(error)
	}
})

export default router

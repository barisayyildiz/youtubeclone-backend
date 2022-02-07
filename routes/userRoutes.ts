import express, { Request, Response } from "express"
import db from "../models"

const router = express.Router()

router.get("/users", async (req:Request, res:Response) => {
	try{
		const users:object = await db.User.findAll({})
		res.json(users)
	}catch(error){
		res.json(error)
	}
})

router.get("/user/:id", async (req:Request, res:Response) => {
	try{
		const user:object = await db.User.findByPk(req.params.id)
		res.json(user)
	}catch(error){
		res.json(error)
	}
})

router.get("/user/videos/:id", async(req:Request, res:Response) => {
	try{
		const user:object = await db.User.findAll({
			include:{
				model:db.Video,
				where:{
					UserId:req.params.id
				},
				attributes:{
					exclude:[
						"UserId",
					]
				}
			}
		})
		res.json(user)
	}catch(error){
		res.json(error)
	}
})

router.get("/user/comments/:id", async(req:Request, res:Response) => {
	try{
		const user:object = await db.User.findAll({
			include:{
				model:db.Comment,
			}
		})
		res.json(user)
	}catch(error){
		res.json(error)
	}
})

router.post("/user", async(req:Request, res:Response) => {
	try{
		const user = await db.User.create({
			...req.body
		})
		res.json(user)
	}catch(error){
		res.json(error)
	}
})

router.put("/user/:id", async (req:Request, res:Response) => {
	try{
		const user = await db.User.findByPk(req.params.id)
		user.set({
			...req.body
		})
		await user.save()
		res.json(user)
	}catch(error){
		res.json(error)
	}
})

router.delete("/user/:id", async (req:Request, res:Response) => {
	try {
		const user = await db.User.findByPk(req.params.id)
		await user.destroy()
		res.json({
			msg:"user successfully removed"
		})
	} catch (error) {
		res.json(error)
	}
})

export default router
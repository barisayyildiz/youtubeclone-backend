import express, { Request, Response } from "express"
import bcrypt from "bcrypt"
import { verifyToken } from "../../auth/util"
import db from "../../models"

const router = express.Router()

router.get("/", async (req:Request, res:Response) => {
	try{
		const users:object = await db.User.findAll({})
		res.json(users)
	}catch(error){
		res.json(error)
	}
})

router.get("/:id", async (req:Request, res:Response) => {
	try{
		const user:object = await db.User.findByPk(req.params.id)
		res.json(user)
	}catch(error){
		res.json(error)
	}
})

router.get("/videos/:id", async(req:Request, res:Response) => {
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

router.get("/comments/:id", async(req:Request, res:Response) => {
	try{
		const user:object = await db.User.findAll({
			include:{
				model:db.Comment,
			},
			where:{
				id:req.params.id
			}
		})
		res.json(user)
	}catch(error){
		res.json(error)
	}
})

router.post("/", async(req:Request, res:Response) => {
	try{
		const { password } = req.body
		const salt = await bcrypt.genSalt()
		const hashed = await bcrypt.hash(password, salt)

		const user = await db.User.create({
			...req.body,
			password:hashed
		})
	
		res.json(user)
	}catch(error){
		res.json(error)
	}
})

router.put("/:id", async (req:Request, res:Response) => {
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

router.delete("/:id", async (req:Request, res:Response) => {
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

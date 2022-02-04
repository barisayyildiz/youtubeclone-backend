import express, { Request, Response } from "express"
import UserModel from "../models/User"

const router = express.Router()

// get all users
router.get("/users", async (req:Request, res:Response) => {
	try{
		const users = await UserModel.findAll()
		res.json(users)
	}catch(error){
		res.json(error)
	}
})

// get user by id
router.get("/user/:id", async (req:Request, res:Response) => {
	const { id } = req.params
	try {
		const user = await UserModel.findByPk(id)
		res.json(user)
	} catch (error) {
		res.json(error)
	}
})

// create a users
router.post("/user", async (req:Request, res:Response) => {

	try {
		const user = UserModel.build({
			...req.body
		})
		// save user
		try{
			await user.save()
			res.json(user)

		} catch(error){
			res.json(error)
		}
	} catch (error) {
		res.json(error)
	}
})

// delete a user
router.delete("/user/:id", async (req:Request, res:Response) => {
	const { id } = req.params
	try {
		const user = await UserModel.findByPk(id)

		if(user){
			user.destroy()
			return res.json({
				msg:"user deleted successfully"
			})
		}
		
		return res.status(204).json({
			msg:"user not found"
		})

	} catch (error) {
		res.json(error)
	}
})

// update a user
router.put("/user/:id", async (req, res) => {
	const { id } = req.params
	console.log(req.body)
	try {
		const user = await UserModel.findByPk(id)

		if(user){
			user.set({
				...req.body
			})
			user.save()
		}
		return res.json(user)

	} catch (error) {
		res.json(error)
	}
})


export default router


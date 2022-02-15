import express, { Request, Response } from "express"
import bcrypt from "bcrypt"
import { verifyToken, verifyAdmin } from "../../auth/util"
import db from "../../models"

import { 
	getAllUsers,
	getUserById,
	getUserByIdWithVideos,
	getUserByIdWithComments,
	createUser,
	updateUser,
	deleteUser,
} from "../../controllers/user"

const router = express.Router()

router.get("/", async (req:Request, res:Response) => {
	try{
		const users:any = await getAllUsers()
		res.json(users)
	}catch(error){
		res.json(error)
	}
})

router.get("/:id", async (req:Request, res:Response) => {
	try{
		const user:any = await getUserById(req.params.id)
		res.json(user)
	}catch(error){
		res.json(error)
	}
})

router.get("/profile", verifyToken, async (req:Request, res:Response) => {
	try{
		const user:any = await getUserById(req.user.id)
		res.json(user)
	}catch(error){
		res.json(error)
	}
})

router.get("/videos/:id", async(req:Request, res:Response) => {
	try{
		const user:any = await getUserByIdWithVideos(req.params.id)
		res.json(user)
	}catch(error){
		res.json(error)
	}
})

router.get("/comments/:id", verifyToken, verifyAdmin, async(req:Request, res:Response) => {
	try{
		const user:any = await getUserByIdWithComments(req.params.id)
		res.json(user)
	}catch(error){
		res.json(error)
	}
})

router.post("/", verifyToken, verifyAdmin, async(req:Request, res:Response) => {
	try{
		console.log("post user endpoint")
		const user:any = await createUser(req.body)
		console.log(user)	
		res.json(user)
	}catch(error){
		res.json(error)
	}
})

router.put("/:id", verifyToken, async (req:Request, res:Response) => {
	try{
		const user = await updateUser(req.params.id, req.body)
		res.json(user)
	}catch(error){
		res.json(error)
	}
})

router.delete("/:id", verifyToken, verifyAdmin, async (req:Request, res:Response) => {
	try {
		await deleteUser(req.params.id)
	} catch (error) {
		res.json(error)
	}
})


export default router

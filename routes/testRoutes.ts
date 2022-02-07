import express, { Request, Response } from "express"
import db from "../models"

const router = express.Router()

router.get("/coders", async (req:Request, res:Response) => {
	try{
		// const coders = await db.Coder.findAll({})
		const coders = await db.Coder.findAll({
			include:[{
				model:db.Repository
			}]
		})


		res.json(coders)
	}catch(error){
		console.log(error)
		res.json(error)
	}
})

router.post("/coders", async (req:Request, res:Response) => {
	try{
		const coder = await db.Coder.create({
			...req.body
		})
		res.json(coder)
	}catch(error){
		console.log(error)
		res.json(error)
	}
})

router.get("/repository", async (req:Request, res:Response) => {
	try{
		const repos = await db.Repository.findAll({})
		res.json(repos)
	}catch(error){
		console.log(error)
		res.json(error)
	}
})

router.post("/repository", async (req:Request, res:Response) => {
	try{
		const repo = await db.Repository.create({
			...req.body
		})
		res.json(repo)
	}catch(error){
		console.log(error)
		res.json(error)
	}
})

router.get("/coderRepos", async (req:Request, res:Response) => {
	try{
		const result = await db.CoderRepo.findAll()
		// const result = await db.CoderRepo.findAll({
		// 	include:[{
		// 		model:db.Coder
		// 	}]
		// })

		res.json(result)
	}catch(error){
		console.log(error)
		res.json(error)
	}
})

router.post("/coderRepos", async (req:Request, res:Response) => {
	try{
		const instance = await db.CoderRepo.create({
			...req.body
		})
		res.json(instance)
	}catch(error){
		console.log(error)
		res.json(error)
	}
})

export default router

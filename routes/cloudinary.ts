import express, { Request, Response, NextFunction } from "express"
import { upload } from "../multer"
import cloudinary from "../config/cloudinary"
import fs from "fs"
// const cloudinary = require("../config/cloudinary")

interface MulterRequest extends Request{
	file?:any;
}

const router = express.Router()

router.post("/image", upload.single('avatar'), (req:MulterRequest, res:Response) => {

	console.log(req.file)
	const { path, filename } = req.file

	// upload image
	cloudinary.uploader
	.upload(path,{
		folder:'avatars'
	})
	.then(async (result:any) => {
		// remove file from disk
		await fs.promises.unlink(`./uploads/${filename}`)
		res.status(200).send({
			msg:'success',
			result
		})
	})
	.catch((err:any) => {
		res.status(500).send({
			msg:'fail',
			err
		})
	})
})

router.post("/video", upload.single('video'), (req:MulterRequest, res:Response) => {
	const { path, filename } = req.file
	
	// upload video
	cloudinary.uploader.upload(path, {
		folder:'videos',
		resource_type: "video"
	})
	.then(async (result:any) => {
		// remove file from disk
		await fs.promises.unlink(`./uploads/${filename}`)
		res.status(200).send({
			msg:'success',
			result
		}) 
	})
	.catch((err:any) => {
		res.status(500).send({
			msg:'fail',
			err
		})
	})

})

router.delete("/video", async (req:Request, res:Response) => {
	const { cloudinary_id } = req.body
	
	cloudinary.uploader
	.destroy(cloudinary_id,{
		folder:'videos',
		resource_type:'video'
	})
		// upload image here
	.then((result:any) => {
		res.status(200).send({
			message:'deleted',
			result
		})
	})
	.catch((error:any) => {
		res.status(500).send({
			message: "failed",
			error,
		});
	});
})

export default router

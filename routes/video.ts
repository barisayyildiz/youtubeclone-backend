import express, { NextFunction, Request, Response } from "express"
import bcrypt from "bcrypt"
import db from "../models"
import { verifyToken } from "../auth/util"
import { 
	getVideosByUserId, 
	createVideo, 
	removeVideo, 
	updateVideo, 
	addToWatchLater, 
	removeFromWatchLater, 
	getVideoById, 
	getWatchLaterList,
	toggleVideoLike,
	toggleVideoDislike
} from "../controllers/video"

const router = express.Router()

// kendi videolarını görme
router.get("/profile", verifyToken, (req:Request, res:Response, next:NextFunction) => {
	return getVideosByUserId(req.user.id, req, res, next)
})

// başka kullanıcıların videolarını görme
router.get("/users/:id", (req:Request, res:Response, next:NextFunction) => {
	return getVideosByUserId(req.params.id, req, res, next)
})

// get video by id
router.get("/video/:id", getVideoById)

// video yükleme
router.post("/", verifyToken, createVideo)

// video silme
router.delete("/:id", verifyToken, removeVideo)

// video bilgilerini güncelleme
router.put("/:id", verifyToken, updateVideo)

// watch later a video ekleme
router.post("/later", verifyToken, addToWatchLater)

// watch later dan silme
router.delete("/later/:id", verifyToken, removeFromWatchLater)

// watch later listesini getirme
router.get("/later", verifyToken, getWatchLaterList)

// toggle video like
router.put("/like/:id", verifyToken, toggleVideoLike)

// toggle video dislike
router.put("/dislike/:id", verifyToken, toggleVideoDislike)



export default router

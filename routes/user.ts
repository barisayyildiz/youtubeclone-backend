import express, { NextFunction, Request, Response } from "express"
import bcrypt from "bcrypt"
import db from "../models"
import { verifyAdmin, verifyToken } from "../auth/util"
import { getUserById, updateUserProfile, getSubscribedChannels, toggleSubscription } from "../controllers/user"

const router = express.Router()

// kendi bilgilerini görme
router.get("/users/profile", verifyToken, (req:Request, res:Response, next:NextFunction) => {
	return getUserById(req.user.id, req, res, next)
})

// başkalarının bilgilerini görme
router.get("/users/:id", (req:Request, res:Response, next:NextFunction) => {
	return getUserById(req.params.id, req, res, next)
})

// kendi bilgilerini güncelleme
router.put("/users/profile", verifyToken, updateUserProfile)

// get subscribed channels
router.get("/users/profile/subscription", verifyToken, (req:Request, res:Response, next:NextFunction) => {
	return getSubscribedChannels(req.user.id, req, res, next)
})

// get subscribed channels of others
router.get("/users/subscription/:id", (req:Request, res:Response, next:NextFunction) => {
	return getSubscribedChannels(req.params.id, req, res, next)
})

// toggle subscription
router.put("/users/profile/subscription/:id", verifyToken, toggleSubscription)






export default router

import express, { NextFunction, Request, Response } from "express"
import bcrypt from "bcrypt"
import db from "../models"
import { verifyAdmin, verifyToken } from "../auth/util"
import { createComment, updateComment, deleteComment, getCommentsByVideo, getCommentById } from "../controllers/comment"

const router = express.Router()
// yorum yapma
router.post("/", verifyToken, createComment)

// yorum düzenleme
router.put("/:id", verifyToken, updateComment)

// yorum silme
router.delete("/:id", verifyToken, deleteComment)

// video id'sine göre yorumları getirme
router.get("/video/:id", getCommentsByVideo)

// get comment by id
router.get("/:id", getCommentById)


export default router

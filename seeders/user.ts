import { v4 as uuidv4 } from "uuid"
import db from "../models"
import bcrypt from "bcrypt"

const insertInitialData = async () => {
	const user = {
		username:'baris',
		password:'123',
		email:'b@a',
		isAdmin:true,
	}
	const salt = await bcrypt.genSalt()
	const hashed = await bcrypt.hash('123', salt)
	await db.User.create({
		...user,
		password:hashed
	})
}

export default insertInitialData

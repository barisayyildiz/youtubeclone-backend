require('dotenv').config()
import { Sequelize } from "sequelize"

import VideoModel from "./models/Videos"
import UserModel from "./models/User"

const {
	USER_NAME, HOST, DATABASE, PASSWORD, DIALECT
} = process.env

const sequelize = new Sequelize(DATABASE!, USER_NAME!, PASSWORD!, {
	host: HOST!,
	dialect: "postgres"
});

UserModel.hasMany(VideoModel)
VideoModel.belongsTo(UserModel)

(async function main(){
	await sequelize.sync()
})()


export default sequelize


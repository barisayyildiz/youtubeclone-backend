require('dotenv').config()
import { Sequelize } from "sequelize"

const {
	USER_NAME, HOST, DATABASE, PASSWORD, DIALECT
} = process.env

const sequelize = new Sequelize(DATABASE!, USER_NAME!, PASSWORD!, {
	host: HOST!,
	dialect: "postgres"
});

export default sequelize


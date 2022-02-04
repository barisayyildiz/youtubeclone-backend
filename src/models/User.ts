import { Sequelize, Model, DataTypes } from "sequelize"
import sequelize from "../db"

interface UserInstance extends Model{
	id: number,
	email: string,
	username: string,
	userpassword: string,
	subscribedto: number[],
}

const UserModel = sequelize.define<UserInstance>("users", {
	id:{
		primaryKey:true,
		type:DataTypes.INTEGER,
		autoIncrement: true
	},
	email:{
		type:DataTypes.STRING
	},
	username:{
		type:DataTypes.STRING
	},
	userpassword:{
		type:DataTypes.STRING
	},
	subscribedto:{
		type:DataTypes.ARRAY(DataTypes.INTEGER)
	}
})

export default UserModel


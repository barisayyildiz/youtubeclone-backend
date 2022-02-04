import { Sequelize, Model, DataTypes } from "sequelize"
import sequelize from "../db"

interface UserInstance extends Model{
	id: number,
	email: string,
	username: string,
	userpassword: string,
	subscribedto: number[],
	watchlater: number[]
}

const UserModel = sequelize.define<UserInstance>("users", {
	id:{
		primaryKey:true,
		type:DataTypes.INTEGER,
		autoIncrement: true
	},
	email:{
		type:DataTypes.STRING,
		unique:true
	},
	username:{
		type:DataTypes.STRING,
		unique:true
	},
	userpassword:{
		type:DataTypes.STRING
	},
	subscribedto:{
		type:DataTypes.ARRAY(DataTypes.INTEGER),
		allowNull:true,
		defaultValue:[]
	},
	watchlater:{
		type:DataTypes.ARRAY(DataTypes.INTEGER),
		allowNull:true,
		defaultValue:[]
	}
})

export default UserModel


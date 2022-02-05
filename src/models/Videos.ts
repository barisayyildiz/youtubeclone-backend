import { Sequelize, Model, DataTypes } from "sequelize"
import sequelize from "../db"

interface VideoInstance extends Model {
	id: number,
	ownerid: number,
	url: string,
	liked: number,
	disliked: number,
	description: string,
	title: string,
	views: number,
	visible: boolean,
}

const VideModel = sequelize.define<VideoInstance>("videos", {
	id:{
		primaryKey: true,
		type:DataTypes.INTEGER,
		autoIncrement: true
	},
	ownerid:{
		type:DataTypes.INTEGER
	},
	url:{
		type:DataTypes.STRING
	},
	liked:{
		type:DataTypes.INTEGER,
		allowNull: true,
		defaultValue: 0
	},
	disliked:{
		type:DataTypes.INTEGER,
		allowNull: true,
		defaultValue: 0
	},
	description:{
		type:DataTypes.STRING,
		allowNull: true,
		defaultValue: ""
	},
	title:{
		type:DataTypes.STRING
	},
	views:{
		type:DataTypes.INTEGER,
		allowNull: true,
		defaultValue: 0
	},
	visible:{
		type:DataTypes.BOOLEAN,
		allowNull: true,
		defaultValue: true
	}
})


export default VideModel

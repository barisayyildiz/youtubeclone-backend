import { Sequelize, Model, DataTypes } from "sequelize"
import sequelize from "../db"

interface CommentInstance extends Model {
	id: number,
	userid: number,
	videoid: number,
	text: string
}

const CommentModel = sequelize.define<CommentInstance>("comments", {
	id:{
		primaryKey: true,
		type:DataTypes.INTEGER,
		autoIncrement: true
	},
	userid:{
		type:DataTypes.INTEGER
	},
	videoid:{
		type:DataTypes.INTEGER
	},
	text:{
		type:DataTypes.STRING
	}
},
	{
		updatedAt:false,
		createdAt:true
	}
)


export default CommentModel

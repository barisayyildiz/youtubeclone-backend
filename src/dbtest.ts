import { Sequelize, DataTypes} from "sequelize"
import User from './models/User'
import Comment from "./models/Comment"
import Subscription from './models/Subscription'
import sequelize from "./db"

async function test(){

	User.hasMany(Comment, {as:"comments"});
	Comment.belongsTo(User, {as:"user"})

	const users = await User.findAll({
		include:[
			"comments"
		]
	})
}

test()



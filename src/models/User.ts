import { Sequelize, Model, DataTypes } from "sequelize"
import sequelize from "../db"
import SubscriptionModel from "./Subscription"
import VideoModel from "./Videos"

interface UserInstance extends Model{
	id: number,
	email: string,
	username: string,
	userpassword: string,
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
	}
})

UserModel.belongsToMany(UserModel, {as:'subscriber', through:SubscriptionModel, foreignKey:"subscriber"})
UserModel.belongsToMany(UserModel, {as:'subscribed', through:SubscriptionModel, foreignKey:"subscribed"})

// UserModel.belongsToMany(UserModel, {as:"subscription_subscriber", through:SubscriptionModel, foreignKey:'subscriber'})
// UserModel.belongsToMany(UserModel, {as:"subscription_subscribed", through:SubscriptionModel, foreignKey:'subscribed'})

export default UserModel


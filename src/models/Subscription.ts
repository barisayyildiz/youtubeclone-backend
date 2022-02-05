import { Sequelize, Model, DataTypes } from "sequelize"
import sequelize from "../db"

interface SubscriptionInstance extends Model {
	id: number,
	subscriber: number,
	subscribed: number
}

const SubscriptionModel = sequelize.define<SubscriptionInstance>("subscriptions", {
	id:{
		primaryKey: true,
		type:DataTypes.INTEGER,
		autoIncrement: true
	},
	subscriber:{
		type:DataTypes.INTEGER
	},
	subscribed:{
		type:DataTypes.INTEGER
	},
},
	{
		updatedAt:false,
		createdAt:true
	}
)


export default SubscriptionModel

'use strict';

import { Model } from "sequelize"

interface SubscriptionAttributes {
	id: string;
}

module.exports = (sequelize:any, DataTypes:any) => {
  class Subscription extends Model<SubscriptionAttributes> implements SubscriptionAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		id!:string;
    static associate(models:any) {
      // define association here
			// User.hasMany(models.Video)
			Subscription.belongsTo(models.User,{
				foreignKey:{
					name:"SubscriberId",
					allowNull:false
				},
				as:"subscriber"
			})
			Subscription.belongsTo(models.User,{
				foreignKey:{
					name:"SubscribedId",
					allowNull:false
				},
				as:"subscribed"
			})
    }
  }
  Subscription.init({
    id:{
			type:DataTypes.UUID,
			allowNull:false,
			primaryKey:true,
			defaultValue:DataTypes.UUIDV4
		}
  }, {
    sequelize,
    modelName: 'Subscription',
  });
  return Subscription;
};
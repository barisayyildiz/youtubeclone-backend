'use strict';

import { Model } from "sequelize"

interface WatchLaterAttributes {
	id: string;
}

module.exports = (sequelize:any, DataTypes:any) => {
  class WatchLater extends Model<WatchLaterAttributes> implements WatchLaterAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		id!:string;
    static associate(models:any) {
      // define association here
			// User.hasMany(models.Video)
			WatchLater.belongsTo(models.User,{
				foreignKey:{
					name:"UserId",
					allowNull:false
				},
				as:"user"
			})
			WatchLater.belongsTo(models.Video,{
				foreignKey:{
					name:"VideoId",
					allowNull:false
				},
				as:"video"
			})
    }
  }
  WatchLater.init({
    id:{
			type:DataTypes.UUID,
			allowNull:false,
			primaryKey:true,
			defaultValue:DataTypes.UUIDV4
		}
  }, {
    sequelize,
    modelName: 'WatchLater',
  });
  return WatchLater;
};
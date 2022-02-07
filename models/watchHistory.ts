'use strict';

import { Model } from "sequelize"

interface WatchHistoryAttributes {
	id: string;
}

module.exports = (sequelize:any, DataTypes:any) => {
  class WatchHistory extends Model<WatchHistoryAttributes> implements WatchHistoryAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		id!:string;
    static associate(models:any) {
      // define association here
			// User.hasMany(models.Video)
			WatchHistory.belongsTo(models.User,{
				foreignKey:{
					name:"UserId",
					allowNull:false
				},
				as:"user"
			})
			WatchHistory.belongsTo(models.Video,{
				foreignKey:{
					name:"VideoId",
					allowNull:false
				},
				as:"video"
			})
    }
  }
  WatchHistory.init({
    id:{
			type:DataTypes.UUID,
			allowNull:false,
			primaryKey:true,
			defaultValue:DataTypes.UUIDV4
		}
  }, {
    sequelize,
    modelName: 'WatchHistory',
  });
  return WatchHistory;
};
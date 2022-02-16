'use strict';

import { Model } from "sequelize"

interface VideoDislikeAttributes {
	id: string;
}

module.exports = (sequelize:any, DataTypes:any) => {
  class VideoDislike extends Model<VideoDislikeAttributes> implements VideoDislikeAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		id!:string;
    static associate(models:any) {
      // define association here
			// User.hasMany(models.Video)
			VideoDislike.belongsTo(models.User,{
				foreignKey:{
					name:"UserId",
					allowNull:false
				},
				as:"user"
			})
			VideoDislike.belongsTo(models.Video,{
				foreignKey:{
					name:"VideoId",
					allowNull:false
				},
				as:"video"
			})
    }
  }
  VideoDislike.init({
    id:{
			type:DataTypes.UUID,
			allowNull:false,
			primaryKey:true,
			defaultValue:DataTypes.UUIDV4
		}
  }, {
    sequelize,
    modelName: 'VideoDislike',
  });
  return VideoDislike;
};
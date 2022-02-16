'use strict';

import { Model } from "sequelize"

interface VideoLikeAttributes {
	id: string;
}

module.exports = (sequelize:any, DataTypes:any) => {
  class VideoLike extends Model<VideoLikeAttributes> implements VideoLikeAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		id!:string;
    static associate(models:any) {
      // define association here
			// User.hasMany(models.Video)
			VideoLike.belongsTo(models.User,{
				foreignKey:{
					name:"UserId",
					allowNull:false
				},
				as:"user"
			})
			VideoLike.belongsTo(models.Video,{
				foreignKey:{
					name:"VideoId",
					allowNull:false
				},
				as:"video"
			})
    }
  }
  VideoLike.init({
    id:{
			type:DataTypes.UUID,
			allowNull:false,
			primaryKey:true,
			defaultValue:DataTypes.UUIDV4
		}
  }, {
    sequelize,
    modelName: 'VideoLike',
  });
  return VideoLike;
};
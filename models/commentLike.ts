'use strict';

import { Model } from "sequelize"

interface CommentLikeAttributes {
	id: string;
}

module.exports = (sequelize:any, DataTypes:any) => {
  class CommentLike extends Model<CommentLikeAttributes> implements CommentLikeAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		id!:string;
    static associate(models:any) {
      // define association here
			// User.hasMany(models.Video)
			CommentLike.belongsTo(models.User,{
				foreignKey:{
					name:"UserId",
					allowNull:false
				},
				as:"user"
			})
			CommentLike.belongsTo(models.Video,{
				foreignKey:{
					name:"VideoId",
					allowNull:false
				},
				as:"video"
			})
    }
  }
  CommentLike.init({
    id:{
			type:DataTypes.UUID,
			allowNull:false,
			primaryKey:true,
			defaultValue:DataTypes.UUIDV4
		}
  }, {
    sequelize,
    modelName: 'CommentLike',
  });
  return CommentLike;
};
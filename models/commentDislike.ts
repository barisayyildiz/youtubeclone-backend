'use strict';

import { Model } from "sequelize"

interface CommentDislikeAttributes {
	id: string;
}

module.exports = (sequelize:any, DataTypes:any) => {
  class CommentDislike extends Model<CommentDislikeAttributes> implements CommentDislikeAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		id!:string;
    static associate(models:any) {
      // define association here
			// User.hasMany(models.Video)
			CommentDislike.belongsTo(models.User,{
				foreignKey:{
					name:"UserId",
					allowNull:false
				},
				as:"user"
			})
			CommentDislike.belongsTo(models.Video,{
				foreignKey:{
					name:"VideoId",
					allowNull:false
				},
				as:"video"
			})
    }
  }
  CommentDislike.init({
    id:{
			type:DataTypes.UUID,
			allowNull:false,
			primaryKey:true,
			defaultValue:DataTypes.UUIDV4
		}
  }, {
    sequelize,
    modelName: 'CommentDislike',
  });
  return CommentDislike;
};
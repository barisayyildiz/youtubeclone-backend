'use strict';

import { Model } from "sequelize"


interface CommentAttributes {
	id: string;
	text: string;
}

module.exports = (sequelize:any, DataTypes:any) => {
  class Comment extends Model<CommentAttributes> implements CommentAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		id!:string;
		text!:string;
    static associate(models:any) {
      // define association here
			// User.hasMany(models.Video)
			Comment.belongsTo(models.User,{
				foreignKey:{
					name:"UserId",
					allowNull:false
				},
				as:"user"
			})
			Comment.belongsTo(models.Video,{
				foreignKey:{
					name:"VideoId",
					allowNull:false
				},
				as:"video"
			})
    }
  }
  Comment.init({
    id:{
			type:DataTypes.UUID,
			allowNull:false,
			primaryKey:true,
			defaultValue:DataTypes.UUIDV4
		},
		text:{
			type:DataTypes.STRING,
			allowNull:false
		}
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
'use strict';
import { Model } from "sequelize"

interface VideoAttributes {
	id: string;
	title: string;
	description: string;
	url: string;
	thumbnail: string;
	likes: number;
	dislikes: number;
	views: number;
}

module.exports = (sequelize:any, DataTypes:any) => {
  class Video extends Model<VideoAttributes> implements VideoAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		id!: string;
		title!: string;
		description!: string;
		url!: string;
		thumbnail!: string;
		likes!: number;
		dislikes!: number;
		views!: number;

    static associate(models:any) {
      // define association here
			Video.belongsTo(models.User,{
				foreignKey:{
					name:"UserId",
					allowNull:false
				},
				as:"user"
			})
			// Comment table
			Video.hasMany(models.Comment, {onDelete: 'CASCADE', hooks:true})

			// WatchLater table
			Video.hasMany(models.WatchLater, {onDelete: 'CASCADE', hooks:true})

			// WatchHistory table
			Video.hasMany(models.WatchHistory, {onDelete: 'CASCADE', hooks:true})

			// VideoLike table
			Video.hasMany(models.VideoLike, {onDelete:'CASCADE', hooks:true})

			// VideoDislike table
			Video.hasMany(models.VideoDislike, {onDelete:'CASCADE', hooks:true})

			
    }
  }
  Video.init({
    id:{
			type:DataTypes.UUID,
			allowNull:false,
			primaryKey:true,
			defaultValue:DataTypes.UUIDV4
		},
		title:{
			type:DataTypes.STRING,
			allowNull:false
		},
		description:{
			type:DataTypes.STRING,
		},
		url:{
			type:DataTypes.STRING,
			allowNull:false
		},
		thumbnail:{
			type:DataTypes.STRING,
		},
		likes:{
			type:DataTypes.INTEGER,
		},
		dislikes:{
			type:DataTypes.INTEGER,
		},
		views:{
			type:DataTypes.INTEGER,
		}
  }, {
    sequelize,
    modelName: 'Video',
  });
  return Video;
};
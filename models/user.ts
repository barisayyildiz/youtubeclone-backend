'use strict';

import { Model } from "sequelize"


interface UserAttributes {
	id: string;
	username: string;
	email: string;
	password: string;
	googleId: string;
	avatar: string;
	isAdmin:boolean;
}

module.exports = (sequelize:any, DataTypes:any) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		id!:string;
		username!:string;
		email!:string;
		password!:string;
		googleId!:string;
		avatar!:string;
		isAdmin!:boolean;
    static associate(models:any) {
			User.hasMany(models.Video, {onDelete: 'CASCADE', hooks:true})
			User.hasMany(models.Comment, {onDelete: 'CASCADE', hooks:true})
			
			// WatchLater table
			User.hasMany(models.WatchLater, {onDelete: 'CASCADE', hooks:true})

			// WatchHistory table
			User.hasMany(models.WatchHistory, {onDelete: 'CASCADE', hooks:true})

			// Subscription table
			User.hasMany(models.Subscription, {onDelete: 'CASCADE', hooks:true})

			// VideoLike table
			User.hasMany(models.VideoLike, {onDelete:'CASCADE', hooks:true})

			// VideoDislike table
			User.hasMany(models.VideoDislike, {onDelete:'CASCADE', hooks:true})

			// CommentLike table
			User.hasMany(models.CommentLike, {onDelete:'CASCADE', hooks:true})

			// CommentDislike table
			User.hasMany(models.CommentDislike, {onDelete:'CASCADE', hooks:true})

    }
  }
  User.init({
    id:{
			type:DataTypes.UUID,
			allowNull:false,
			primaryKey:true,
			defaultValue:DataTypes.UUIDV4
		},
		username:{
			type:DataTypes.STRING,
			allowNull:false,
			unique:true
		},
		email:{
			type:DataTypes.STRING,
			allowNull:false,
			unique:true
		},
		password:{
			type:DataTypes.STRING,
			allowNull:false
		},
		googleId:{
			type:DataTypes.STRING,
			allowNull:true
		},
		avatar:{
			type:DataTypes.STRING,
			allowNull:true,
			defaultValue:'https://res.cloudinary.com/dys0awgqk/image/upload/v1645385586/default_avatar_k91usd.jpg'
		},
		isAdmin:{
			type:DataTypes.BOOLEAN,
			allowNull:false,
			defaultValue:false
		}
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};

'use strict';

import { Model } from "sequelize"


interface UserAttributes {
	id: string;
	username: string;
	email: string;
	password: string;
	googleId: string;
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
    static associate(models:any) {
			User.hasMany(models.Video, {onDelete: 'CASCADE', hooks:true})
			User.hasMany(models.Comment, {onDelete: 'CASCADE', hooks:true})
			
			// WatchLater table
			User.hasMany(models.WatchLater, {onDelete: 'CASCADE', hooks:true})

			// WatchHistory table
			User.hasMany(models.WatchHistory, {onDelete: 'CASCADE', hooks:true})

			// Subscription table
			User.hasMany(models.Subscription, {onDelete: 'CASCADE', hooks:true})

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
		}
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};

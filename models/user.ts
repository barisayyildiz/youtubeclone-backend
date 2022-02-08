'use strict';

import { Model } from "sequelize"


interface UserAttributes {
	id: string;
	username: string;
	email: string;
	password: string;
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
    static associate(models:any) {
      // define association here
			// User.belongsToMany(models.Project, {
			// 	through:"ProjectAssignment"
			// })
			User.hasMany(models.Video, {onDelete: 'CASCADE'})
			User.hasMany(models.Comment, {onDelete: 'CASCADE'})
			
			// WatchLater table
			User.hasMany(models.WatchLater, {onDelete: 'CASCADE'})

			// WatchHistory table
			User.hasMany(models.WatchHistory, {onDelete: 'CASCADE'})

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
		}
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
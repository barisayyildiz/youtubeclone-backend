'use strict';

import { Model } from "sequelize"

interface ProjectAttributes {
	id: number;
	title: string;
	status: boolean;
}

module.exports = (sequelize:any, DataTypes:any) => {
  class Project extends Model<ProjectAttributes> implements ProjectAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		id!:number;
		title!:string;
		status!:boolean;
    static associate(models:any) {
      // define association here
			Project.belongsToMany(models.User,{
				through:"ProjectAssignment"
			})
    }
  }
  Project.init({
    id:{
			type:DataTypes.INTEGER,
			allowNull:false,
			primaryKey:true,
			autoIncrement:true
		},
		title:{
			type:DataTypes.STRING,
			allowNull:false
		},
		status:{
			type:DataTypes.BOOLEAN,
			allowNull:false
		}
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};
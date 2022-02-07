'use strict';

import { Model } from "sequelize"


interface CodeAttributes {
	id: string;
	name: string;
}

module.exports = (sequelize:any, DataTypes:any) => {
  class Coder extends Model<CodeAttributes> implements CodeAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		id!:string;
		name!:string;
    static associate(models:any) {
      // define association here
			Coder.belongsToMany(models.Repository, {through:'CoderRepos'})

    }
  }
  Coder.init({
    id:{
			type:DataTypes.UUID,
			allowNull:false,
			primaryKey:true,
			defaultValue:DataTypes.UUIDV4
		},
		name:{
			type:DataTypes.STRING,
			allowNull:false,
			unique:true
		}
  }, {
    sequelize,
    modelName: 'Coder',
  });
  return Coder;
};
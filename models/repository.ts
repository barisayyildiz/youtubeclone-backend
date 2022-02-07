'use strict';
import { Model } from "sequelize"

interface RepositoryAttributes {
	id: string;
	title: string;
}

module.exports = (sequelize:any, DataTypes:any) => {
  class Repository extends Model<RepositoryAttributes> implements RepositoryAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		id!:string;
		title!:string;
    static associate(models:any) {
      // define association here			
			Repository.belongsToMany(models.Coder, {through:'CoderRepos'})

    }
  }
  Repository.init({
    id:{
			type:DataTypes.UUID,
			allowNull:false,
			primaryKey:true,
			defaultValue:DataTypes.UUIDV4
		},
		title:{
			type:DataTypes.STRING,
			allowNull:false
		}
  }, {
    sequelize,
    modelName: 'Repository',
  });
  return Repository;
};
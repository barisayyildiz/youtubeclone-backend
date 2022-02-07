'use strict';
import { Model } from "sequelize"

interface CoderRepoAttributes {
	CoderId: string;
	RepositoryId: string;
}

module.exports = (sequelize:any, DataTypes:any) => {
  class CoderRepo extends Model<CoderRepoAttributes> implements CoderRepoAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		CoderId!:string;
		RepositoryId!:string;
    static associate(models:any) {
      // define association here			
			

    }
  }
  CoderRepo.init({
    CoderId:{
			type:DataTypes.UUID,
			allowNull:false,
			primaryKey:true,
			references:{
				model:'Coders',
				key:'id'
			}
		},
		RepositoryId:{
			type:DataTypes.UUID,
			allowNull:false,
			primaryKey:true,
			references:{
				model:'Repositories',
				key:'id'
			}
		}
  }, {
    sequelize,
    modelName: 'CoderRepo',
  });
  return CoderRepo;
};
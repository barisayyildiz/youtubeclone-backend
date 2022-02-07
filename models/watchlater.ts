'use strict';
import { Model, UUIDV4 } from "sequelize"

interface WatchLaterAttributes {
	id:string,
	VideoId: string,
	UserId: string
}

module.exports = (sequelize:any, DataTypes:any) => {
  class WatchLater extends Model<WatchLaterAttributes> implements WatchLaterAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		id!:string;
		VideoId!:string;
		UserId!:string;
    static associate(models:any) {
      // define association here
    }
  }
  WatchLater.init({
		id:{
			type:DataTypes.UUID,
			allowNull:false,
			primaryKey:true,
			defaultValue:DataTypes.UUIDV4
		},
    VideoId: {
			type:DataTypes.UUID,
			allowNull:false,
			primaryKey:false,
			references:{
				model:'Videos',
				key:'id'
			}
		},
		UserId: {
			type:DataTypes.UUID,
			allowNull:false,
			primaryKey:false,
			references:{
				model:'Users',
				key:'id'
			}
		}
  }, {
    sequelize,
    modelName: 'WatchLater',
  });
  return WatchLater;
};
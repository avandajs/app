import { DataTypes } from "sequelize";
import DataType from "./DataType";
export default class Bool extends DataType {
    getType() {
        return DataTypes.BOOLEAN;
    }
}

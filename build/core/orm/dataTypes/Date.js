import { DataTypes } from "sequelize";
import DataType from "./DataType";
export default class Date extends DataType {
    getType() {
        return DataTypes.DATE;
    }
}

import { DataTypes } from "sequelize";
import DataType from "./DataType";
export default class Int extends DataType {
    getType() {
        return DataTypes.INTEGER;
    }
}

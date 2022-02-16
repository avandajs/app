import { DataTypes } from "sequelize";
import DataType from "./DataType";
export default class Enum extends DataType {
    getType() {
        return DataTypes.ENUM(...this.args);
    }
}

import { DataTypes } from "sequelize";
import DataType from "./DataType";
export default class Text extends DataType {
    getType() {
        if (this.size) {
            return DataTypes.STRING(typeof this.size == 'number' ? this.size : undefined);
        }
        else {
            return DataTypes.TEXT;
        }
    }
}

import {Column,Model} from "../../core/orm";
import User from "./User";

export default class Wallet extends Model{
    @Column.decimal({
        masSize:[65,4]
    })
    balance?: number

    @Column.int({
        references: new User()
    })
    user_id?: number

    @Column.decimal({
        masSize:[65,4]
    })
    holding_balance?: number


}
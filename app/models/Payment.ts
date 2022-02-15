import {Column,Model} from "../../core/orm";
import User from "./User";

export default class Payment extends Model{
    @Column.int({
        references: new User()
    })
    user_id: number

    @Column.decimal({
        masSize:[65,4]
    })
    amount: number

    @Column.enum(['INVESTMENT','PURCHASE'])
    for: 'INVESTMENT' | 'PURCHASE'

    @Column.enum(['pending','initiated','completed'])
    status: 'pending' | 'initiated' | 'completed'

    @Column.text({
        masSize:200
    })
    token: number

}
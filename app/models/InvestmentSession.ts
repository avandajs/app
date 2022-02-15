import {Column,Model} from "../../core/orm";


export default class InvestmentSession extends Model{
    @Column.text()
    name?: string

    @Column.text()
    description?: string

    @Column.date()
    expiry_time?: string

    @Column.int()
    no_of_active_investment?: number

    @Column.int()
    no_of_expired_investment?: number

    @Column.decimal({
        masSize: [65,4]
    })
    total_allowed_capital?: number

    @Column.boolean()
    is_active?: boolean
}
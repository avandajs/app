import {Column,Model} from "../../core/orm";
import InvestmentSession from "./InvestmentSession";

export default class InvestmentPlan extends Model{
    @Column.text()
    name?: string

    @Column.text()
    description?: string

    @Column.boolean()
    is_active?: boolean

    @Column.int({
        references: new InvestmentSession()
    })
    investment_session_id?: number

    @Column.decimal({
        masSize: [65,4]
    })
    required_capital?: number

    @Column.decimal({
        masSize: [65,4],
        nullable: true
    })
    percentage_increment?: number

    @Column.decimal({
        masSize: [65,4],
        nullable: true
    })
    static_increment?: number

    @Column.int()
    total_allowed_investors?: number

    @Column.json()
    duration?: {count: number,unit:'days'|'hours'|'months'|'years'}

}
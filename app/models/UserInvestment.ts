import {Column,Model} from "../../core/orm";
import InvestmentPlan from "./InvestmentPlan";
import User from "./User";

export default class UserInvestment extends Model{
    @Column.int({
        references: new InvestmentPlan()
    })
    investment_plan_id?: number

    @Column.int({
        references: new User()
    })
    user_id?: number

    @Column.int({
        masSize: [65,4]
    })
    accrued_interest?: number

    @Column.date()
    expired_time?: string
}
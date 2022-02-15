import {Column,Model} from "../../core/orm";
import MarketItem from "./MarketItem";
import User from "./User";

export default class SavedMarketItem extends Model{
    @Column.int({
        references: new MarketItem()
    })
    market_item_id?: number;

    @Column.int({
        references: new User()
    })
    user_id?: number;
}

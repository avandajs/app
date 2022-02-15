import {Column,Model} from "../../core/orm";
import MarketItem from "./MarketItem";
import User from "./User";
import Address from "./Address";

export default class Order extends Model{
    @Column.int({
        references: new MarketItem()
    })
    market_item_id?: number;

    @Column.int({
        references: new User()
    })
    user_id?: number;

    @Column.enum(
        ['pending','initiated','completed']
    )
    status: 'pending' | 'initiated' | 'completed';
    @Column.int({
        references: new Address()
    })
    address_id?: number;
}

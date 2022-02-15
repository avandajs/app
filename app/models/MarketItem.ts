import {Column,Model} from "../../core/orm";

export default class MarketItem extends Model{
    @Column.int({
        masSize: [65,4],
    })
    price?: number;

    @Column.int()
    available_quantity?: number;

    @Column.int({
        masSize: [65,4],
    })
    discount_price?: number;

    @Column.int()
    sales?: number;
}
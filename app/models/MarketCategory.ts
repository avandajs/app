import {Column,Model} from "../../core/orm";

export default class MarketCategory extends Model{
    @Column.text()
    name?:string;

    @Column.text()
    cover_picture?:string;

    @Column.text()
    description?:string;
}
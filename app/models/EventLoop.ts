import {Column,Model} from "../../core/orm";

export default class EventLoop extends Model{
    @Column.text({
        masSize: 255,
        index: true
    })
    event?:string;

    @Column.json()
    payload?:string;
}
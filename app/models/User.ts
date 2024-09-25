import {Column, GeoPoint, Model} from "../../core/orm";
import {Request} from "../../core/http";
import {Token} from "../../core/app";


export default class User extends Model{

    id?: number

    @Column.text({
        unique: true,
        masSize: 255
    })
    email?: string

    @Column.text()
    password?: string

    @Column.text()
    full_name?: string

    @Column.text({
        nullable: true
    })
    phone_number?: string

    @Column.text({
        nullable: true
    })
    picture?: string

    distance?: number


    @Column.point()
    location?: GeoPoint;

    async getActiveUserId(req: Request): Promise<number|null>{
        let token = req.getHeader<string>('authorization').split(' ')[1]
        let tokenDetails = (await Token.decode<{user_id: number}>(token))
        return tokenDetails?.user_id ?? null
    }
}
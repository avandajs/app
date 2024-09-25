import {Seeder} from "@avanda/orm"
import User from "../models/User"
export default class implements Seeder{
    async run(faker: Faker.FakerStatic): Promise<void> {
        await new User().create({
            phone_number: faker.phone.phoneNumber("+23470########"),
            full_name: faker.name.findName(),
            email: faker.internet.email(),
            password:"fsfsdsdsd",
            picture:"pic2.jpg",
            location: {
                coordinates: faker.address.nearbyGPSCoordinate([7.492402715640438, 4.519379346784824],20) as unknown as [number, number],
                type: "Point"
            }
        })
    }
}
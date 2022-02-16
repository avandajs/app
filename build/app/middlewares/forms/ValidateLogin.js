import User from "../../models/User";
export default class ValidateLogin {
    boot(res, req) {
        return req.validate((Rule) => ({
            email: new Rule().email().required().exists(new User())
        }));
    }
}

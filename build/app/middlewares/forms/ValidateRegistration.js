import User from "../../models/User";
export default class ValidateRegistration {
    async boot(res, req) {
        // console.log(new Validator.Rule().required().email())
        return req.validate((Rule) => ({
            email: new Rule().required().email().unique(new User()),
            password: new Rule().required(),
            full_name: new Rule().required().phone("en-NG"),
            confirmPassword: new Rule()
                .required()
                .refs('password')
                .error('confirm password must be same as password'),
        }));
    }
}

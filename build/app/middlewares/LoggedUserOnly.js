import User from "../models/User";
export default class LoggedUserOnly {
    async boot(res, req) {
        let user = new User();
        try {
            let activeUserId = await user.getActiveUserId(req);
            return !!activeUserId && !!(await user.find(activeUserId));
        }
        catch (e) {
            return res.error('You are not logged in');
        }
    }
}

import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';
export default class Schema {
    constructor(schema) {
        this.schema = schema;
    }
    async validate(data) {
        let errors = {};
        const checkers = {
            isEmail: (value) => value && isEmail(value),
            required: (value) => typeof value != 'undefined' && value.trim().length > 0,
            minLength: (value, length) => typeof value != 'undefined' && value.trim().length >= length,
            maxLength: (value, length) => typeof value != 'undefined' && value.trim().length <= length,
            isPhone: (value, locale) => value && isMobilePhone(value, locale),
            unique: async (value, model, key) => !await model.where({ [key]: value }).first(),
            exists: async (value, model, key) => !!await model.where({ [key]: value }).first(),
            custom: async (value, func, key) => {
                return await func(value);
            },
            pattern: async (value, pattern) => pattern.test(value),
            ref: async (value, key) => value === data[key],
        };
        for (let prop in this.schema) {
            let schema = this.schema[prop];
            let value = data[prop];
            for (let rulesKey in schema.rules) {
                let rule = schema.rules[rulesKey];
                let check = await checkers[rulesKey](value, rule.rule, prop);
                console.log({ check, value });
                if (!check || typeof check == 'string') {
                    let errMsg = typeof check == 'string' ? check : rule.errorMsg;
                    errors[prop] = typeof errMsg == 'function' ? errMsg(prop, value) : errMsg;
                    console.log({ errorToPush: errors[prop] });
                    break;
                }
            }
        }
        console.log({ errors });
        return errors;
    }
}

import * as argon2 from "argon2";
let make = async function (value) {
    return await argon2.hash(value);
};
let verify = async function (hash, value) {
    return await argon2.verify(hash, value);
};
let random = function (length = 20) {
    let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let token = '';
    for (let i = 0; i < length; i++) {
        token += chars[Math.floor(Math.random() * chars.length)];
    }
    return token;
};
export { make, verify, random };

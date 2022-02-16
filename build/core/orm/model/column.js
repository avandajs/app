import "reflect-metadata";
import Text from "../dataTypes/Text";
import Int from "../dataTypes/Int";
import Decimal from "../dataTypes/Decimal";
import Bool from "../dataTypes/Bool";
import Date from "../dataTypes/Date";
import JSON from "../dataTypes/JSON";
import Enum from "../dataTypes/Enum";
let column = function (dataType, options) {
    if (!options)
        options = {};
    return (target, propertyKey) => {
        let metadataKey = target.constructor.name;
        let properties = Reflect.getMetadata(metadataKey, target);
        dataType.size = options === null || options === void 0 ? void 0 : options.masSize;
        dataType.isNullable = options === null || options === void 0 ? void 0 : options.nullable;
        dataType.setter = options === null || options === void 0 ? void 0 : options.setter;
        dataType.getter = options === null || options === void 0 ? void 0 : options.getter;
        options.dataType = dataType;
        if (properties) {
            properties.push({
                name: propertyKey,
                options
            });
        }
        else {
            properties = [{
                    name: propertyKey,
                    options
                }];
            Reflect.defineMetadata(metadataKey, properties, target);
        }
    };
};
let text = function (options) {
    return column(new Text(), options);
};
let int = function (options) {
    return column(new Int(), options);
};
let decimal = function (options) {
    return column(new Decimal(), options);
};
let boolean = function (options) {
    return column(new Bool(), options);
};
let date = function (options) {
    return column(new Date(), options);
};
let json = function (options) {
    return column(new JSON(), options);
};
let _enum = function (acceptedValues, options) {
    let e = new Enum();
    e.args = acceptedValues;
    return column(e, options);
};
export default {
    text,
    int,
    date,
    json,
    decimal,
    enum: _enum,
    boolean
};

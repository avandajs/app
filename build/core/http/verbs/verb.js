import validate from "../middleware/validate";
export default function (middlewares, method) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args) {
            let request = args[1];
            let response = args[0];
            if (request.method.toLowerCase() !== method) { //invalid request
                return function (...args) {
                    return response.error('Bad request type', 500);
                };
            }
            else if (request.method.toLowerCase() == 'options') {
                return function (...args) {
                    return response.success('Preflight', 200);
                };
            }
            //check for middlewares validity
            let middlewareCheck = await validate(middlewares, response, request);
            if (middlewareCheck !== null) {
                return function (...args) {
                    return middlewareCheck;
                };
            }
            // console.log({args})
            //ignore next line
            Object.defineProperty(this, 'request_method', { value: 'get' });
            const result = originalMethod.apply(this, args);
            return result;
        };
        return descriptor;
    };
}

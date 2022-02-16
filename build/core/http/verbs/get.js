import verb from "./verb";
export default function (...middlewares) {
    return verb(middlewares, 'get');
}

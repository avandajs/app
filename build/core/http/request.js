import { Validator } from "@avanda/app";
import Response from "./response";
import axios from "axios";
export default class Request {
    constructor() {
        this.attrs = {};
    }
    getFiles(key) {
        var _a;
        let files = (_a = this.files) === null || _a === void 0 ? void 0 : _a[key];
        if (!Array.isArray(files))
            return [files];
        return files;
    }
    getFile(key) {
        var _a;
        console.log({ files: this.files });
        let files = (_a = this.files) === null || _a === void 0 ? void 0 : _a[key];
        if (Array.isArray(files))
            return files[0];
        else
            return files;
    }
    getData(key) {
        var _a, _b;
        return key ? ((_b = (_a = this.data) === null || _a === void 0 ? void 0 : _a[key]) !== null && _b !== void 0 ? _b : null) : null;
    }
    setData(data) {
        this.data = data;
        return this;
    }
    setHeaders(headers) {
        this.headers = headers;
        return this;
    }
    setQuery(query) {
        this.query = query;
        return this;
    }
    setAttr(attr, value) {
        this.attrs[attr] = value;
        return this;
    }
    setAttrs(attrs) {
        this.attrs = attrs;
        return this;
    }
    getHeader(key) {
        var _a, _b;
        return key ? ((_b = (_a = this.headers) === null || _a === void 0 ? void 0 : _a[key]) !== null && _b !== void 0 ? _b : null) : null;
    }
    getArgs(key) {
        var _a, _b;
        return key ? ((_b = (_a = this.args) === null || _a === void 0 ? void 0 : _a[key]) !== null && _b !== void 0 ? _b : null) : null;
    }
    getAttrs(key) {
        var _a, _b;
        return key ? ((_b = (_a = this.attrs) === null || _a === void 0 ? void 0 : _a[key]) !== null && _b !== void 0 ? _b : null) : null;
    }
    getParams(key) {
        var _a, _b;
        return key ? ((_b = (_a = this.params) === null || _a === void 0 ? void 0 : _a[key]) !== null && _b !== void 0 ? _b : null) : null;
    }
    async validate(schemaRules) {
        let schema = (new Validator.Schema(schemaRules(Validator.Rule)));
        let result = await schema.validate(this.data);
        if (Object.keys(result).length > 0) {
            return (new Response()).error('Invalid input', 400, result);
        }
        return true;
    }
    async get(url) {
        return await this.makeRequest(url, async (url) => await axios.get(url, {
            headers: this.headers
        }));
    }
    async post(url, data) {
        return await this.makeRequest(url, async (url) => {
            var _a;
            return await axios.post(url, (_a = data !== null && data !== void 0 ? data : this.data) !== null && _a !== void 0 ? _a : {}, {
                headers: this.headers
            });
        });
    }
    async patch(url, data) {
        return await this.makeRequest(url, async (url) => {
            var _a;
            return await axios.patch(url, (_a = data !== null && data !== void 0 ? data : this.data) !== null && _a !== void 0 ? _a : {}, {
                headers: this.headers
            });
        });
    }
    async put(url, data) {
        return await this.makeRequest(url, async (url) => {
            var _a;
            return await axios.put(url, (_a = data !== null && data !== void 0 ? data : this.data) !== null && _a !== void 0 ? _a : {}, {
                headers: this.headers
            });
        });
    }
    async makeRequest(url, request) {
        try {
            let queryString = this.query ? new URLSearchParams(this.query).toString() : '';
            if (queryString.length)
                url += '?' + queryString;
            let axiosRes = await request(url);
            let status = axiosRes.status;
            let headers = axiosRes.headers;
            let response = new Response();
            response.headers = headers;
            response.status_code = status;
            response.data = axiosRes.data;
            return response;
        }
        catch (e) {
            let response = new Response();
            response.headers = e.response.headers;
            response.status_code = e.response.status;
            response.data = e.response.data;
            response.message = e.response.statusText;
            return response;
        }
    }
}

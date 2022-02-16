import express from "express";
import * as bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import cors from "cors";
import { Request, Response } from "../index";
import { snakeCase, omit, isPlainObject } from "lodash";
/*
 *
 * The keys in the json/Service objects
 * are kept single letter to
 * make request URL as
 * short as possible
 *
 * */
export default class Query {
    constructor(serverConfig) {
        this.app = express();
        this.port = 8080;
        this.path = '/';
        this.models = {};
        this.controllers = {};
        this.serverConfig = serverConfig;
        this.connection = serverConfig.connection;
        this.port = parseInt(serverConfig.port);
        this.path = serverConfig.rootPath;
        return this;
    }
    async execute(models, controllers) {
        this.models = models;
        this.controllers = controllers;
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(cors({
            credentials: true,
            origin: (origin, callback) => {
                if (!origin || this.serverConfig.CORSWhitelist.indexOf(origin) !== -1) {
                    callback(null, true);
                }
                else {
                    callback(new Error('Not allowed by CORS'));
                }
            }
        }));
        this.app.use(fileUpload({
            useTempFiles: true
        }));
        this.app.use(express.static('public'));
        this.app.all(this.path, async (req, res) => {
            let query = req.query.query;
            if (query) {
                query = JSON.parse(query);
                if (query) {
                    let response = await this.generateResponse(query, req, res);
                    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Auth-Token, Origin, Authorization');
                    if (response instanceof Response) {
                        res.status(parseInt(response.status_code));
                        res.json(Object.assign({ msg: response.message, data: response.data, status_code: response.status_code, totalPages: response.currentPage }, (response.totalPages && { totalPages: response.totalPages })));
                        return;
                    }
                    else {
                        res.json(Object.assign({ msg: 'Auto-generated message', data: response, status_code: 200, totalPages: response.currentPage }, (response.totalPages && { totalPages: response.totalPages })));
                    }
                    return;
                }
            }
            res.send('Hello World!');
        });
        return this;
    }
    getServerInstance() {
        return this.app;
    }
    listen() {
        if (!this.app)
            throw new Error('Execute before you listen');
        this.app.listen(this.port, () => {
            console.log(`app listening at http://localhost:${this.port}`);
        });
        return this.app;
    }
    async extractNeededDataFromArray(data, columns, req, res, rootService, toExclude) {
        var _a, _b, _c;
        let ret = [];
        if (Array.isArray(data)) {
            for (let index in data) {
                let datum;
                if (isPlainObject(data[index])) {
                    if (!datum)
                        datum = {};
                    if (columns.length) {
                        for (let col of columns) {
                            if (typeof col == 'string' || (col.t && col.t == 'c')) {
                                col = typeof col == 'string' ? col : col.n;
                                //
                                if ((_a = toExclude === null || toExclude === void 0 ? void 0 : toExclude.includes) === null || _a === void 0 ? void 0 : _a.call(toExclude, col.trim()))
                                    continue;
                                // if (this)
                                data[index] = JSON.parse(JSON.stringify(data[index]));
                                if (col in data[index]) {
                                    datum[col] = data[index][col];
                                }
                            }
                            else {
                                let service = col;
                                col = col.a ? col.a : col.n.toLowerCase();
                                datum[col] = await this.generateResponse(service, req, res, false, data[index], rootService);
                                //    await this.generateResponse(service, req, res,false)
                                //    process the sub-service here
                            }
                        }
                    }
                    else {
                        //    return all data if no column was specified
                        datum = omit(data[index], toExclude !== null && toExclude !== void 0 ? toExclude : []);
                    }
                }
                else {
                    //    item in this array is not object
                    datum = data[index];
                }
                ret.push(datum);
            }
        }
        else {
            let datum = {};
            if (columns.length) {
                for (const service of columns) {
                    if (typeof service == 'string' || (service.t && service.t === 'c')) {
                        let column = typeof service == 'string' ? service : service.n;
                        if ((_b = toExclude === null || toExclude === void 0 ? void 0 : toExclude.includes) === null || _b === void 0 ? void 0 : _b.call(toExclude, column.trim()))
                            continue;
                        datum[column] = (_c = data[column]) !== null && _c !== void 0 ? _c : null;
                    }
                    else {
                        datum[service.a ? service.a : service.n.toLowerCase()] = await this.generateResponse(service, req, res, false, data, rootService);
                    }
                }
            }
            else {
                if (isPlainObject(data))
                    datum = omit(data, toExclude !== null && toExclude !== void 0 ? toExclude : []);
                else
                    datum = data;
            }
            ret = datum;
        }
        return ret;
    }
    async generateResponse(query, req, res, isRoot = true, parentData, parentService) {
        let name = query.n;
        let type = query.t;
        let children = query.c;
        if (isRoot) { //get root autolink state
            this.autoLink = query.al;
        }
        let data = null;
        if (!(name in this.controllers)) {
            throw new Error('Invalid controller name: ' + name);
        }
        let controller = new this.controllers[name](await this.connection);
        let toExclude = controller === null || controller === void 0 ? void 0 : controller.exclude;
        let controllerResponse = await this.getServiceFncResponse(controller, req, res, name, query, parentData, parentService);
        if (typeof controllerResponse == 'function' && !(controllerResponse instanceof Response))
            //will be function if returned from middleware decorator
            controllerResponse = await new controllerResponse();
        //
        if (!(controllerResponse instanceof Response) && isRoot) {
            //convert raw returned data to response for the root
            controllerResponse = await (new Response()).success('', controllerResponse);
        }
        if (isRoot && controllerResponse.status_code > 299) { //if is root, and response doesn't look success, return the root response only
            return controllerResponse;
        }
        let controllerData = controllerResponse instanceof Response ? await controllerResponse.data : await controllerResponse;
        if (children && controllerData) { //
            data = await this.extractNeededDataFromArray(JSON.parse(JSON.stringify(controllerData, null, 2)), children, req, res, query, toExclude);
            //
        }
        if (isRoot && controllerResponse instanceof Response) {
            controllerResponse.data = data;
            return controllerResponse;
        }
        return data;
    }
    async getServiceFncResponse(controller, req, res, serviceName, service, parentData, parentService) {
        // get Controller's specified function
        // initiate controller
        let fnc = service.f ? service.f : 'get';
        let model = null;
        let request = new Request();
        request.method = req.method;
        request.data = req.body;
        request.files = req.files;
        request.args = parentData;
        request.headers = req.headers;
        request.params = service.pr;
        request.page = service.p;
        let filters = {};
        if (this.models && (serviceName in this.models)) {
            model = new this.models[serviceName](await this.connection);
            if (this.autoLink && parentData) { //auto-link enabled
                //find secondary key in parent data
                let parent_key = snakeCase(parentService.n) + '_id';
                let self_key = snakeCase(serviceName) + '_id';
                if (typeof parentData[self_key] != 'undefined') {
                    //    parent has 1 to 1 relationship
                    model.where({ id: parentData[self_key] });
                }
                else {
                    // Parent has 1 to many relationship
                    if (typeof parentData['id'] == 'undefined') {
                        throw new Error(`${parentService.n} does not return property "id" to link ${service.n}'s secondary key ${parent_key} with`);
                    }
                    model.where({ [parent_key]: parentData['id'] });
                }
            }
            if (service.ft) {
                //apply filters
                model = Query.bindFilters(model, service.ft);
            }
        }
        //set the model
        controller.model = model;
        if (typeof controller[fnc] != 'function')
            throw new Error(`function \`${fnc}\` does not exist in ${serviceName}`);
        return await controller[fnc](new Response(), request);
    }
    static bindFilters(model, filters) {
        var _a;
        let operators;
        operators = {
            ">": (key, value, model) => {
                model.whereRaw(`${key} > ${value}`);
            },
            "<": (key, value, model) => {
                model.whereRaw(`${key} < ${value}`);
            },
            "==": (key, value, model) => {
                model.where({ [key]: value });
            },
            "=": (key, value, model) => {
                operators['=='](key, value, model);
            },
            "!=": (key, value, model) => {
                model.whereRaw(`${key} != ${value}`);
            },
            "NULL": (key, value, model) => {
                model.whereColIsNull(key);
            },
            "NOTNULL": (key, value, model) => {
                model.whereColIsNotNull(key);
            },
            "MATCHES": (key, value, model) => {
                model.whereColumns(key).matches(value);
            },
            "LIKES": (key, value, model) => {
                model.where(key).like(`%${value}%`);
            },
            "NOT": (key, value, model) => {
                model.where(key).notLike("%$value%");
            }
        };
        for (let key in filters) {
            let filter = filters[key];
            let value = (_a = filter.vl) !== null && _a !== void 0 ? _a : null;
            let operator = filter.op;
            operators[operator](key, value, model);
        }
        return model;
    }
}

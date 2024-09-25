"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { createServer } = require('vite');
const { ViteNodeServer } = require('vite-node/server');
const { ViteNodeRunner } = require('vite-node/client');
class Serve {
    constructor() {
        this.command = "serve";
        this.description = "serve project";
    }
    async exe(port = '', options) {
        // create vite server
        const server = await createServer();
        // this is need to initialize the plugins
        await server.pluginContainer.buildStart({});
        // create vite-node server
        const node = new ViteNodeServer(server);
        // create vite-node runner
        const runner = new ViteNodeRunner({
            root: server.config.root,
            base: server.config.base,
            // when having the server and runner in a different context,
            // you will need to handle the communication between them
            // and pass to this function
            fetchModule(id) {
                return node.fetchModule(id);
            },
            resolveId(id, importer) {
                return node.resolveId(id, importer);
            },
        });
        // execute the file
        await runner.executeFile('./app/index.ts');
        // close the vite server
        await server.close();
    }
}
exports.default = Serve;

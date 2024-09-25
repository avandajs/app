import { Broadcastable } from "../../core/http";

export default class TestEvent extends Broadcastable{
    get path(): string {
        return 'testing-event';
    }
    payload(): any {
        return {
            name: 'adewale',
            pay: 'load'
        }
    }

    async defaultPayload(): Promise<any> {
        return {
            name: 'adewale',
            pay: 'load default'
        }
    }

}
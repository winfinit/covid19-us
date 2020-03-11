const Debug: any = require('debug');

export class Covid19US {
    debug: any;

    constructor() {
        this.debug = Debug('convid19-us');
        this.debug("test message from Covid19US constructor");
    }
}
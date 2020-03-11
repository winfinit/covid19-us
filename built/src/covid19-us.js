"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Debug = require('debug');
var Covid19US = /** @class */ (function () {
    function Covid19US() {
        this.debug = Debug('convid19-us');
        this.debug("test message from Covid19US constructor");
    }
    return Covid19US;
}());
exports.Covid19US = Covid19US;

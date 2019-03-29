"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CfgVo_1 = require("./CfgVo");
class CfgInit {
    constructor() { }
    static initCfg() {
        let obj = require("../config/Cfg");
        this.cfgVo = new CfgVo_1.CfgVo();
        this.cfgVo.code = obj.code;
        this.cfgVo.startYear = obj.start_year;
        this.cfgVo.endYear = obj.end_year;
    }
}
CfgInit.configJson = {};
CfgInit.cfgVo = null;
exports.CfgInit = CfgInit;
//# sourceMappingURL=CfgInit.js.map
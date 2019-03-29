"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CfgInit_1 = require("./init/CfgInit");
const ProcessCSV_1 = require("./core/ProcessCSV");
class Main {
    static main() {
        CfgInit_1.CfgInit.initCfg();
        ProcessCSV_1.ProcessCSV.process("sh_fzb");
        //ProcessCSV.process("sh_llb");
        //ProcessCSV.process("sh_lrb");
    }
}
Main.main();
//# sourceMappingURL=Main.js.map
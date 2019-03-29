import { CfgVo } from "./CfgVo";

export class CfgInit{


    public static configJson :object = {};
    public static cfgVo: CfgVo = null;

    constructor(){ }

    public static initCfg():void{

       let obj:any = require("../config/Cfg")
       
       this.cfgVo = new CfgVo();
       this.cfgVo.code = obj.code;
       this.cfgVo.startYear = obj.start_year;
       this.cfgVo.endYear = obj.end_year;

    }
}
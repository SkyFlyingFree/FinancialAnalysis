import {CfgInit} from "./init/CfgInit";
import {ProcessCSV} from "./core/ProcessCSV";


class Main{

    public static  main() : void{

        CfgInit.initCfg();

        ProcessCSV.process("sh_fzb");
        ProcessCSV.process("sh_llb");
        ProcessCSV.process("sh_lrb");
    }
}




Main.main();





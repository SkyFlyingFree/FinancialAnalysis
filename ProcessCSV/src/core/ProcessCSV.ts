import xlsx from 'node-xlsx';
import { CfgInit } from "../init/CfgInit";
import { ProcessFzb } from "./ProcessFzb";
import { ProcessLlb } from "./ProcessLlb";
import { ProcessLrb } from "./ProcessLrb";

const fs = require("fs");
const parse = require('csv-parse/lib/sync')
const iconv = require('iconv-lite');

export class ProcessCSV {


    public static process(reportType: string): void {

        let code = CfgInit.cfgVo.code;
        let start = parseInt(CfgInit.cfgVo.startYear);
        let end = parseInt(CfgInit.cfgVo.endYear);

        let prefix = `${reportType}_${code}`;
        let dir = `bin/report/${code}/${prefix}_${start}_${end}/`;

        let reports: any = [];
        let heads: any = [];

        /// 解析 CSV
        for (let i = start; i < end; i++) {

            let filePath = `${dir}${prefix}_${i}.csv`

            let content = fs.readFileSync(filePath, { encoding: 'binary' });
            const buf = Buffer.from(content, 'binary');
            const str = iconv.decode(buf, 'GBK'); // 得到正常的字符串，没有乱码

            let records = parse(str, {
                columns: false,
                skip_empty_lines: true
            });

            reports.push(records[records.length - 1])
            //读取表头
            if (i == start) {
                heads = records[0];
            }

        }

        /// 生成excel
        let finaType = reportType.split("_")[1];
        let excelPath = `bin/report/${code}/${finaType}_${code}.xlsx`;

        if (finaType == "fzb") {
            ProcessFzb.processCSV(excelPath, reports, heads);
        } else if (finaType == "llb") {
            ProcessLlb.processCSV(excelPath, reports, heads);
        } else if (finaType == "lrb") {
            ProcessLrb.processCSV(excelPath, reports, heads);
        }


    }

   
}
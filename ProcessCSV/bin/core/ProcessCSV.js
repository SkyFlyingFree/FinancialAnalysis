"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CfgInit_1 = require("../init/CfgInit");
const ProcessFzb_1 = require("./ProcessFzb");
const ProcessLlb_1 = require("./ProcessLlb");
const ProcessLrb_1 = require("./ProcessLrb");
const fs = require("fs");
const parse = require('csv-parse/lib/sync');
const iconv = require('iconv-lite');
class ProcessCSV {
    static process(reportType) {
        let code = CfgInit_1.CfgInit.cfgVo.code;
        let start = parseInt(CfgInit_1.CfgInit.cfgVo.startYear);
        let end = parseInt(CfgInit_1.CfgInit.cfgVo.endYear);
        let prefix = `${reportType}_${code}`;
        let dir = `bin/report/${code}/${prefix}_${start}_${end}/`;
        let reports = [];
        let heads = [];
        /// 解析 CSV
        for (let i = start; i < end; i++) {
            let filePath = `${dir}${prefix}_${i}.csv`;
            let content = fs.readFileSync(filePath, { encoding: 'binary' });
            const buf = Buffer.from(content, 'binary');
            const str = iconv.decode(buf, 'GBK'); // 得到正常的字符串，没有乱码
            let records = parse(str, {
                columns: false,
                skip_empty_lines: true
            });
            reports.push(records[records.length - 1]);
            //读取表头
            if (i == start) {
                heads = records[0];
            }
        }
        /// 生成excel
        let finaType = reportType.split("_")[1];
        let excelPath = `../company/reports/${finaType}_${code}.xlsx`;
        if (finaType == "fzb") {
            ProcessFzb_1.ProcessFzb.processCSV(excelPath, reports, heads);
        }
        else if (finaType == "llb") {
            ProcessLlb_1.ProcessLlb.processCSV(excelPath, reports, heads);
        }
        else if (finaType == "lrb") {
            ProcessLrb_1.ProcessLrb.processCSV(excelPath, reports, heads);
        }
    }
}
exports.ProcessCSV = ProcessCSV;
//# sourceMappingURL=ProcessCSV.js.map
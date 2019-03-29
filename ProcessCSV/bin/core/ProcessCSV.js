"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CfgInit_1 = require("../init/CfgInit");
const node_xlsx_1 = require("node-xlsx");
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
        let excelPath = `bin/report/${code}/${finaType}_${code}.xlsx`;
        if (finaType == "fzb") {
            this.processFzb(excelPath, reports, heads);
        }
        else if (finaType == "llb") {
            this.processLlb(excelPath, reports, heads);
        }
        else if (finaType == "lrb") {
            this.processLrb(excelPath, reports, heads);
        }
    }
    //资产负债表
    static processFzb(xlsxPath, reports, heads) {
        var buffer = node_xlsx_1.default.build([{ name: "资产负债表", data: reports }]);
        fs.writeFile(xlsxPath, buffer, function (err) {
        });
    }
    //利润表
    static processLrb(xlsxPath, reports, heads) {
    }
    //现金流量表
    static processLlb(xlsxPath, reports, heads) {
    }
}
exports.ProcessCSV = ProcessCSV;
//# sourceMappingURL=ProcessCSV.js.map
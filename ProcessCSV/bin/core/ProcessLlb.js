"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_xlsx_1 = require("node-xlsx");
const fs = require("fs");
class ProcessLlb {
    //现金流量表
    static processCSV(xlsxPath, reports, heads) {
        //head
        let headArr = [];
        headArr[0] = heads[5]; //报表日期
        headArr[1] = "单位"; //单位
        headArr[2] = "一、经营活动产生的现金流量"; //一、经营活动产生的现金流量
        headArr[3] = heads[8]; //销售商品、提供劳务收到的现金
        headArr[4] = heads[9]; //收到的税费返还
        headArr[5] = heads[10]; //收到的其他与经营活动有关的现金
        headArr[6] = heads[11]; //经营活动现金流入小计
        headArr[7] = heads[12]; //购买商品、接受劳务支付的现金
        headArr[8] = heads[13]; //支付给职工以及为职工支付的现金
        headArr[9] = heads[14]; //支付的各项税费
        headArr[10] = heads[15]; //支付的其他与经营活动有关的现金
        headArr[11] = heads[16]; //经营活动现金流出小计
        headArr[12] = heads[17]; //经营活动产生的现金流量净额
        headArr[13] = "二、投资活动产生的现金流量"; //二、投资活动产生的现金流量
        headArr[14] = heads[18]; //收回投资所收到的现金
        headArr[15] = heads[19]; //取得投资收益所收到的现金
        headArr[16] = heads[20]; //处置固定资产、无形资产和其他长期资产所收回的现金净额
        headArr[17] = heads[21]; //处置子公司及其他营业单位收到的现金净额
        headArr[18] = heads[22]; //收到的其他与投资活动有关的现金
        headArr[19] = heads[23]; //投资活动现金流入小计
        headArr[20] = heads[24]; //购建固定资产、无形资产和其他长期资产所支付的现金
        headArr[21] = heads[25]; //投资所支付的现金
        headArr[22] = heads[27]; //取得子公司及其他营业单位支付的现金净额
        headArr[23] = heads[28]; //支付的其他与投资活动有关的现金
        headArr[24] = heads[29]; //投资活动现金流出小计
        headArr[25] = heads[30]; //投资活动产生的现金流量净额
        headArr[26] = "三、筹资活动产生的现金流量"; //三、筹资活动产生的现金流量
        headArr[27] = heads[31]; //吸收投资收到的现金
        headArr[28] = heads[91]; //其中：子公司吸收少数股东投资收到的现金
        headArr[29] = heads[32]; //取得借款收到的现金
        headArr[30] = heads[33]; //发行债券收到的现金
        headArr[31] = heads[34]; //收到其他与筹资活动有关的现金
        headArr[32] = heads[35]; //筹资活动现金流入小计
        headArr[33] = heads[36]; //偿还债务支付的现金
        headArr[34] = heads[37]; //分配股利、利润或偿付利息所支付的现金
        headArr[35] = heads[92]; //其中：子公司支付给少数股东的股利、利润
        headArr[36] = heads[38]; //支付其他与筹资活动有关的现金
        headArr[37] = heads[39]; //筹资活动现金流出小计
        headArr[38] = heads[40]; //筹资活动产生的现金流量净额
        headArr[39] = heads[41]; //四、汇率变动对现金及现金等价物的影响
        headArr[40] = heads[43]; //五、现金及现金等价物净增加额
        headArr[41] = heads[44]; //加:期初现金及现金等价物余额
        headArr[42] = heads[45]; //六、期末现金及现金等价物余额
        headArr[43] = "附注"; //附注
        headArr[44] = heads[48]; //净利润
        headArr[45] = "少数股东权益"; //少数股东权益
        headArr[46] = "未确认的投资损失"; //未确认的投资损失
        headArr[47] = heads[49]; //资产减值准备
        headArr[48] = heads[50]; //固定资产折旧、油气资产折耗、生产性物资折旧
        headArr[49] = heads[51]; //无形资产摊销
        headArr[50] = heads[52]; //长期待摊费用摊销
        headArr[51] = "待摊费用的减少"; //待摊费用的减少
        headArr[52] = "预提费用的增加"; //预提费用的增加
        headArr[53] = heads[53]; //处置固定资产、无形资产和其他长期资产的损失
        headArr[54] = heads[54]; //固定资产报废损失
        headArr[55] = heads[55]; //公允价值变动损失
        headArr[56] = "递延收益增加（减：减少）"; //递延收益增加（减：减少）
        headArr[57] = "预计负债"; //预计负债
        headArr[58] = heads[56]; //财务费用
        headArr[59] = heads[57]; //投资损失
        headArr[60] = heads[58]; //递延所得税资产减少
        headArr[61] = heads[59]; //递延所得税负债增加
        headArr[62] = heads[60]; //存货的减少
        headArr[63] = heads[61]; //经营性应收项目的减少
        headArr[64] = heads[62]; //经营性应付项目的增加
        headArr[65] = "已完工尚未结算款的减少(减:增加)"; //已完工尚未结算款的减少(减:增加)
        headArr[66] = "已结算尚未完工款的增加(减:减少)"; //已结算尚未完工款的增加(减:减少)
        headArr[67] = heads[63]; //其他
        headArr[68] = heads[64]; //经营活动产生现金流量净额
        headArr[69] = heads[66]; //债务转为资本
        headArr[70] = heads[67]; //一年内到期的可转换公司债券
        headArr[71] = heads[68]; //融资租入固定资产
        headArr[72] = heads[70]; //现金的期末余额
        headArr[73] = heads[71]; //现金的期初余额
        headArr[74] = heads[72]; //现金等价物的期末余额
        headArr[75] = heads[73]; //现金等价物的期初余额
        headArr[76] = heads[75]; //现金及现金等价物的净增加额
        let output = [];
        output.push(headArr);
        for (let i = reports.length - 1; i >= 0; i--) {
            let heads = reports[i];
            let headArr = [];
            headArr[0] = heads[4]; //报表日期
            headArr[1] = "元"; //单位
            headArr[2] = ""; //一、经营活动产生的现金流量
            headArr[3] = Number(heads[8]) || 0; //销售商品、提供劳务收到的现金
            headArr[4] = Number(heads[9]) || 0; //收到的税费返还
            headArr[5] = Number(heads[10]) || 0; //收到的其他与经营活动有关的现金
            headArr[6] = Number(heads[11]) || 0; //经营活动现金流入小计
            headArr[7] = Number(heads[12]) || 0; //购买商品、接受劳务支付的现金
            headArr[8] = Number(heads[13]) || 0; //支付给职工以及为职工支付的现金
            headArr[9] = Number(heads[14]) || 0; //支付的各项税费
            headArr[10] = Number(heads[15]) || 0; //支付的其他与经营活动有关的现金
            headArr[11] = Number(heads[16]) || 0; //经营活动现金流出小计
            headArr[12] = Number(heads[17]) || 0; //经营活动产生的现金流量净额
            headArr[13] = ""; //二、投资活动产生的现金流量
            headArr[14] = Number(heads[18]) || 0; //收回投资所收到的现金
            headArr[15] = Number(heads[19]) || 0; //取得投资收益所收到的现金
            headArr[16] = Number(heads[20]) || 0; //处置固定资产、无形资产和其他长期资产所收回的现金净额
            headArr[17] = Number(heads[21]) || 0; //处置子公司及其他营业单位收到的现金净额
            headArr[18] = Number(heads[22]) || 0; //收到的其他与投资活动有关的现金
            headArr[19] = Number(heads[23]) || 0; //投资活动现金流入小计
            headArr[20] = Number(heads[24]) || 0; //购建固定资产、无形资产和其他长期资产所支付的现金
            headArr[21] = Number(heads[25]) || 0; //投资所支付的现金
            headArr[22] = Number(heads[27]) || 0; //取得子公司及其他营业单位支付的现金净额
            headArr[23] = Number(heads[28]) || 0; //支付的其他与投资活动有关的现金
            headArr[24] = Number(heads[29]) || 0; //投资活动现金流出小计
            headArr[25] = Number(heads[30]) || 0; //投资活动产生的现金流量净额
            headArr[26] = ""; //三、筹资活动产生的现金流量
            headArr[27] = Number(heads[31]) || 0; //吸收投资收到的现金
            headArr[28] = Number(heads[91]) || 0; //其中：子公司吸收少数股东投资收到的现金
            headArr[29] = Number(heads[32]) || 0; //取得借款收到的现金
            headArr[30] = Number(heads[33]) || 0; //发行债券收到的现金
            headArr[31] = Number(heads[34]) || 0; //收到其他与筹资活动有关的现金
            headArr[32] = Number(heads[35]) || 0; //筹资活动现金流入小计
            headArr[33] = Number(heads[36]) || 0; //偿还债务支付的现金
            headArr[34] = Number(heads[37]) || 0; //分配股利、利润或偿付利息所支付的现金
            headArr[35] = Number(heads[92]) || 0; //其中：子公司支付给少数股东的股利、利润
            headArr[36] = Number(heads[38]) || 0; //支付其他与筹资活动有关的现金
            headArr[37] = Number(heads[39]) || 0; //筹资活动现金流出小计
            headArr[38] = Number(heads[40]) || 0; //筹资活动产生的现金流量净额
            headArr[39] = Number(heads[41]) || 0; //四、汇率变动对现金及现金等价物的影响
            headArr[40] = Number(heads[43]) || 0; //五、现金及现金等价物净增加额
            headArr[41] = Number(heads[44]) || 0; //加:期初现金及现金等价物余额
            headArr[42] = Number(heads[45]) || 0; //六、期末现金及现金等价物余额
            headArr[43] = ""; //附注
            headArr[44] = Number(heads[48]) || 0; //净利润
            headArr[45] = ""; //少数股东权益
            headArr[46] = ""; //未确认的投资损失
            headArr[47] = Number(heads[49]) || 0; //资产减值准备
            headArr[48] = Number(heads[50]) || 0; //固定资产折旧、油气资产折耗、生产性物资折旧
            headArr[49] = Number(heads[51]) || 0; //无形资产摊销
            headArr[50] = Number(heads[52]) || 0; //长期待摊费用摊销
            headArr[51] = ""; //待摊费用的减少
            headArr[52] = ""; //预提费用的增加
            headArr[53] = Number(heads[53]) || 0; //处置固定资产、无形资产和其他长期资产的损失
            headArr[54] = Number(heads[54]) || 0; //固定资产报废损失
            headArr[55] = Number(heads[55]) || 0; //公允价值变动损失
            headArr[56] = ""; //递延收益增加（减：减少）
            headArr[57] = ""; //预计负债
            headArr[58] = Number(heads[56]) || 0; //财务费用
            headArr[59] = Number(heads[57]) || 0; //投资损失
            headArr[60] = Number(heads[58]) || 0; //递延所得税资产减少
            headArr[61] = Number(heads[59]) || 0; //递延所得税负债增加
            headArr[62] = Number(heads[60]) || 0; //存货的减少
            headArr[63] = Number(heads[61]) || 0; //经营性应收项目的减少
            headArr[64] = Number(heads[62]) || 0; //经营性应付项目的增加
            headArr[65] = ""; //已完工尚未结算款的减少(减:增加)
            headArr[66] = ""; //已结算尚未完工款的增加(减:减少)
            headArr[67] = Number(heads[63]) || 0; //其他
            headArr[68] = Number(heads[64]) || 0; //经营活动产生现金流量净额
            headArr[69] = Number(heads[66]) || 0; //债务转为资本
            headArr[70] = Number(heads[67]) || 0; //一年内到期的可转换公司债券
            headArr[71] = Number(heads[68]) || 0; //融资租入固定资产
            headArr[72] = Number(heads[70]) || 0; //现金的期末余额
            headArr[73] = Number(heads[71]) || 0; //现金的期初余额
            headArr[74] = Number(heads[72]) || 0; //现金等价物的期末余额
            headArr[75] = Number(heads[73]) || 0; //现金等价物的期初余额
            headArr[76] = Number(heads[75]) || 0; //现金及现金等价物的净增加额
            output.push(headArr);
        }
        //转置数组
        let result = [];
        for (let i = 0; i < output[0].length; i++) {
            result[i] = [];
        }
        for (let i = 0; i < output.length; i++) {
            let row = output[i];
            for (let j = 0; j < row.length; j++) {
                result[j][i] = output[i][j];
            }
        }
        var buffer = node_xlsx_1.default.build([{ name: "现金流量表", data: result }]);
        fs.writeFile(xlsxPath, buffer, function (err) {
            //console.log("error:" + err)
        });
    }
}
exports.ProcessLlb = ProcessLlb;
//# sourceMappingURL=ProcessLlb.js.map
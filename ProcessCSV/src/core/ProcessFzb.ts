
import xlsx from 'node-xlsx';

const fs = require("fs");

export class ProcessFzb{

     //资产负债表
     public static processCSV(xlsxPath: string, reports: any, heads: any): void {

        //head
        let headArr = []
        headArr[0] = heads[4];  //报表日期
        headArr[1] = "单位";     //单位
        headArr[2] = "流动资产"; //流动资产
        headArr[3] = heads[7];   //货币资金
        headArr[4] = heads[8]; //交易性金融资产
        headArr[5] = heads[81]; //衍生金融资产
        headArr[6] = heads[9]; //应收票据
        headArr[7] = heads[10]; //应收账款
        headArr[8] = heads[11]; //预付款项
        headArr[9] = heads[14]; //应收利息
        headArr[10] = heads[15]; //应收股利
        headArr[11] = heads[12]; //其他应收款
        headArr[12] = heads[85]; //买入返售金融资产
        headArr[13] = heads[16]; //存货
        headArr[14] = heads[86]; //划分为持有待售的资产
        headArr[15] = heads[18]; //一年内到期的非流动资产
        headArr[16] = heads[35]; //待摊费用
        headArr[17] = heads[8]; //待处理流动资产损益
        headArr[18] = heads[19]; //其他流动资产
        headArr[19] = heads[20]; //流动资产合计
        headArr[20] = "非流动资产"; //非流动资产
        headArr[21] = heads[80]; //发放贷款及垫款
        headArr[22] = heads[21]; //可供出售金融资产
        headArr[23] = heads[22]; //持有至到期投资
        headArr[24] = heads[23]; //长期应收款
        headArr[25] = heads[24]; //长期股权投资
        headArr[26] = heads[25]; //投资性房地产
        headArr[27] = heads[26]; //固定资产净额
        headArr[28] = heads[27]; //在建工程
        headArr[29] = heads[28]; //工程物资
        headArr[30] = heads[29]; //固定资产清理
        headArr[31] = heads[30]; //生产性生物资产
        headArr[32] = "公益性生物资产"; //公益性生物资产
        headArr[33] = heads[31]; //油气资产
        headArr[34] = heads[32]; //无形资产
        headArr[35] = heads[33]; //开发支出
        headArr[36] = heads[34]; //商誉
        headArr[37] = heads[35]; //长期待摊费用
        headArr[38] = heads[36]; //递延所得税资产
        headArr[39] = heads[37]; //其他非流动资产
        headArr[40] = heads[38]; //非流动资产合计
        headArr[41] = heads[39]; //资产总计
        headArr[42] = "流动负债"; //流动负债
        headArr[43] = heads[40]; //短期借款
        headArr[44] = heads[41]; //交易性金融负债
        headArr[45] = heads[42]; //应付票据
        headArr[46] = heads[43]; //应付账款
        headArr[47] = heads[44]; //预收款项
        headArr[48] = heads[93]; //应付手续费及佣金
        headArr[49] = heads[45]; //应付职工薪酬
        headArr[50] = heads[46]; //应交税费
        headArr[51] = heads[47]; //应付利息
        headArr[52] = heads[48]; //应付股利
        headArr[53] = heads[49]; //其他应付款
        headArr[54] = heads[99]; //预提费用
        headArr[55] = "一年内的递延收益"; //一年内的递延收益
        headArr[56] = "应付短期债券"; //应付短期债券
        headArr[57] = heads[51]; //一年内到期的非流动负债
        headArr[58] = heads[52]; //其他流动负债
        headArr[59] = heads[53]; //流动负债合计
        headArr[60] = "非流动负债"; //非流动负债
        headArr[61] = heads[54]; //长期借款
        headArr[62] = heads[55]; //应付债券
        headArr[63] = heads[56]; //长期应付款
        headArr[64] = heads[103]; //长期应付职工薪酬
        headArr[65] = heads[57]; //专项应付款
        headArr[66] = heads[58]; //预计非流动负债
        headArr[67] = heads[59]; //递延所得税负债
        headArr[68] = heads[77]; //长期递延收益
        headArr[69] = heads[60]; //其他非流动负债
        headArr[70] = heads[61]; //非流动负债合计
        headArr[71] = heads[62]; //负债合计
        headArr[72] = "所有者权益"; //所有者权益
        headArr[73] = heads[63]; //实收资本(或股本)
        headArr[74] = heads[64]; //资本公积
        headArr[75] = heads[67]; //减：库存股
        headArr[76] = heads[76]; //其他综合收益
        headArr[77] = heads[66]; //专项储备
        headArr[78] = heads[65]; //盈余公积
        headArr[79] = heads[68]; //一般风险准备
        headArr[80] = heads[69]; //未分配利润
        headArr[81] = heads[70]; //归属于母公司股东权益合计
        headArr[82] = heads[71]; //少数股东权益
        headArr[83] = heads[74]; //所有者权益(或股东权益)合计
        headArr[84] = heads[75]; //负债和所有者权益(或股东权益)总计

        let output: any = [];
        output.push(headArr);

        for (let i = reports.length - 1; i >= 0; i--) {
            let heads = reports[i];
            let headArr: any = [];

            headArr[0] = heads[4];  //报表日期
            headArr[1] = "元";     //单位
            headArr[2] = ""; //流动资产
            headArr[3] = heads[7];   //货币资金
            headArr[4] = heads[8]; //交易性金融资产
            headArr[5] = heads[81]; //衍生金融资产
            headArr[6] = heads[9]; //应收票据
            headArr[7] = heads[10]; //应收账款
            headArr[8] = heads[11]; //预付款项
            headArr[9] = heads[14]; //应收利息
            headArr[10] = heads[15]; //应收股利
            headArr[11] = heads[12]; //其他应收款
            headArr[12] = heads[85]; //买入返售金融资产
            headArr[13] = heads[16]; //存货
            headArr[14] = heads[86]; //划分为持有待售的资产
            headArr[15] = heads[18]; //一年内到期的非流动资产
            headArr[16] = heads[35]; //待摊费用
            headArr[17] = heads[8]; //待处理流动资产损益
            headArr[18] = heads[19]; //其他流动资产
            headArr[19] = heads[20]; //流动资产合计
            headArr[20] = ""; //非流动资产
            headArr[21] = heads[80]; //发放贷款及垫款
            headArr[22] = heads[21]; //可供出售金融资产
            headArr[23] = heads[22]; //持有至到期投资
            headArr[24] = heads[23]; //长期应收款
            headArr[25] = heads[24]; //长期股权投资
            headArr[26] = heads[25]; //投资性房地产
            headArr[27] = heads[26]; //固定资产净额
            headArr[28] = heads[27]; //在建工程
            headArr[29] = heads[28]; //工程物资
            headArr[30] = heads[29]; //固定资产清理
            headArr[31] = heads[30]; //生产性生物资产
            headArr[32] = ""; //公益性生物资产
            headArr[33] = heads[31]; //油气资产
            headArr[34] = heads[32]; //无形资产
            headArr[35] = heads[33]; //开发支出
            headArr[36] = heads[34]; //商誉
            headArr[37] = heads[35]; //长期待摊费用
            headArr[38] = heads[36]; //递延所得税资产
            headArr[39] = heads[37]; //其他非流动资产
            headArr[40] = heads[38]; //非流动资产合计
            headArr[41] = heads[39]; //资产总计
            headArr[42] = ""; //流动负债
            headArr[43] = heads[40]; //短期借款
            headArr[44] = heads[41]; //交易性金融负债
            headArr[45] = heads[42]; //应付票据
            headArr[46] = heads[43]; //应付账款
            headArr[47] = heads[44]; //预收款项
            headArr[48] = heads[93]; //应付手续费及佣金
            headArr[49] = heads[45]; //应付职工薪酬
            headArr[50] = heads[46]; //应交税费
            headArr[51] = heads[47]; //应付利息
            headArr[52] = heads[48]; //应付股利
            headArr[53] = heads[49]; //其他应付款
            headArr[54] = heads[99]; //预提费用
            headArr[55] = ""; //一年内的递延收益
            headArr[56] = ""; //应付短期债券
            headArr[57] = heads[51]; //一年内到期的非流动负债
            headArr[58] = heads[52]; //其他流动负债
            headArr[59] = heads[53]; //流动负债合计
            headArr[60] = ""; //非流动负债
            headArr[61] = heads[54]; //长期借款
            headArr[62] = heads[55]; //应付债券
            headArr[63] = heads[56]; //长期应付款
            headArr[64] = heads[103]; //长期应付职工薪酬
            headArr[65] = heads[57]; //专项应付款
            headArr[66] = heads[58]; //预计非流动负债
            headArr[67] = heads[59]; //递延所得税负债
            headArr[68] = heads[77]; //长期递延收益
            headArr[69] = heads[60]; //其他非流动负债
            headArr[70] = heads[61]; //非流动负债合计
            headArr[71] = heads[62]; //负债合计
            headArr[72] = ""; //所有者权益
            headArr[73] = heads[63]; //实收资本(或股本)
            headArr[74] = heads[64]; //资本公积
            headArr[75] = heads[67]; //减：库存股
            headArr[76] = heads[76]; //其他综合收益
            headArr[77] = heads[66]; //专项储备
            headArr[78] = heads[65]; //盈余公积
            headArr[79] = heads[68]; //一般风险准备
            headArr[80] = heads[69]; //未分配利润
            headArr[81] = heads[70]; //归属于母公司股东权益合计
            headArr[82] = heads[71]; //少数股东权益
            headArr[83] = heads[74]; //所有者权益(或股东权益)合计
            headArr[84] = heads[75]; //负债和所有者权益(或股东权益)总计

            output.push(headArr);
        }

        //转置数组
        let result:any = [];
        for(let i=0;i<output[0].length;i++){
            result[i] = [];
        }

        for(let i=0; i<output.length; i++){
            let row = output[i];
            for(let j=0; j<row.length;j++){
                result[j][i] = output[i][j];
            }
        }

        var buffer = xlsx.build([{ name: "资产负债表", data: result}]);
        fs.writeFile(xlsxPath, buffer, function (err) {
            //console.log("error:" + err)
        });
    }
}
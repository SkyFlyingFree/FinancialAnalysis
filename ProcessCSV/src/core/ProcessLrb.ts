import xlsx from 'node-xlsx';

const fs = require("fs");

export class ProcessLrb {

    //利润表
    public static processCSV(xlsxPath: string, reports: any, heads: any): void {

        //head
        let headArr = []
        headArr[0] = heads[5];  //报表日期
        headArr[1] = "单位";     //单位
        headArr[2] = heads[8]; //一、营业总收入
        headArr[3] = heads[9];   //营业收入
        headArr[4] = heads[10]; //二、营业总成本
        headArr[5] = heads[11]; //营业成本
        headArr[6] = heads[12]; //营业税金及附加
        headArr[7] = heads[13]; //销售费用
        headArr[8] = heads[14]; //管理费用
        headArr[9] = heads[16]; //财务费用
        headArr[10] = heads[17]; //资产减值损失
        headArr[11] = heads[18]; //公允价值变动收益
        headArr[12] = heads[19]; //投资收益
        headArr[13] = heads[20]; //其中:对联营企业和合营企业的投资收益
        headArr[14] = heads[21]; //汇兑收益
        headArr[15] = heads[23]; //三、营业利润
        headArr[16] = heads[25]; //加:营业外收入
        headArr[17] = heads[26]; //减：营业外支出
        headArr[18] = heads[27]; //其中：非流动资产处置损失
        headArr[19] = heads[29]; //四、利润总额
        headArr[20] = heads[30]; //减：所得税费用
        headArr[21] = heads[32]; //五、净利润
        headArr[22] = heads[33]; //归属于母公司所有者的净利润
        headArr[23] = heads[34]; //少数股东损益
        headArr[24] = heads[35]; //六、每股收益
        headArr[25] = heads[36]; //基本每股收益(元/股)
        headArr[26] = heads[37]; //稀释每股收益(元/股)
        headArr[27] = heads[38]; //七、其他综合收益
        headArr[28] = heads[39]; //八、综合收益总额
        headArr[29] = heads[40]; //归属于母公司所有者的综合收益总额
        headArr[30] = heads[41]; //归属于少数股东的综合收益总额


        let output: any = [];
        output.push(headArr);

        for (let i = reports.length - 1; i >= 0; i--) {
            let heads = reports[i];
            let headArr: any = [];

            headArr[0] = heads[5];  //报表日期
            headArr[1] = "元";     //单位
            headArr[2] = heads[8]; //一、营业总收入
            headArr[3] = heads[9];   //营业收入
            headArr[4] = heads[10]; //二、营业总成本
            headArr[5] = heads[11]; //营业成本
            headArr[6] = heads[12]; //营业税金及附加
            headArr[7] = heads[13]; //销售费用
            headArr[8] = heads[14]; //管理费用
            headArr[9] = heads[16]; //财务费用
            headArr[10] = heads[17]; //资产减值损失
            headArr[11] = heads[18]; //公允价值变动收益
            headArr[12] = heads[19]; //投资收益
            headArr[13] = heads[20]; //其中:对联营企业和合营企业的投资收益
            headArr[14] = heads[21]; //汇兑收益
            headArr[15] = heads[23]; //三、营业利润
            headArr[16] = heads[25]; //加:营业外收入
            headArr[17] = heads[26]; //减：营业外支出
            headArr[18] = heads[27]; //其中：非流动资产处置损失
            headArr[19] = heads[29]; //四、利润总额
            headArr[20] = heads[30]; //减：所得税费用
            headArr[21] = heads[32]; //五、净利润
            headArr[22] = heads[33]; //归属于母公司所有者的净利润
            headArr[23] = heads[34]; //少数股东损益
            headArr[24] = heads[35]; //六、每股收益
            headArr[25] = heads[36]; //基本每股收益(元/股)
            headArr[26] = heads[37]; //稀释每股收益(元/股)
            headArr[27] = heads[38]; //七、其他综合收益
            headArr[28] = heads[39]; //八、综合收益总额
            headArr[29] = heads[40]; //归属于母公司所有者的综合收益总额
            headArr[30] = heads[41]; //归属于少数股东的综合收益总额

            output.push(headArr);
        }

        //转置数组
        let result: any = [];
        for (let i = 0; i < output[0].length; i++) {
            result[i] = [];
        }

        for (let i = 0; i < output.length; i++) {
            let row = output[i];
            for (let j = 0; j < row.length; j++) {
                result[j][i] = output[i][j];
            }
        }

        var buffer = xlsx.build([{ name: "利润表", data: result }]);
        fs.writeFile(xlsxPath, buffer, function (err) {
            //console.log("error:" + err)
        });
    }
}
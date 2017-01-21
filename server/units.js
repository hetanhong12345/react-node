/**
 * Created by Administrator on 2016/9/28.
 */
var session = require('./session');
var units={

};
function IsDate(d) {
    if(!isNaN(d)){
        return false;
    }
    var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/;
    var result = d.match(reg);
    if (result == null) {
        return false
    }
    ;
    var dt = new Date(result[1], result[3] - 1, result[4]);
    if (Number(dt.getFullYear()) != Number(result[1])) {
        return false;
    }
    if (Number(dt.getMonth()) + 1 != Number(result[3])) {
        return false;
    }
    if (Number(dt.getDate()) != Number(result[4])) {
        return false;
    }
    return true;
}
function xlsxParse(obj) {
    var xlsx = obj[0].data;
    var xlsxName = [], xlsxData = [];
    var value = session.get('xlsx').value;
    if (!value) {
        return {
            msg: -1,
            msgInfo: '系统错误'
        };
    }
    var keyName = '';
    for (var key in xlsx[0]) {
        keyName = xlsx[0][key];
        if (!value[keyName]) {
            return {
                msg: -1,
                msgInfo: '文件表头错误 第' + (+key + 1) + '列:' + keyName
            }
        }
        xlsxName.push(value[keyName]);
    }
    var col = '';
    for (var j = 1, xlsxLen = xlsx.length; j < xlsxLen; j++) {
        /*第J行*/
        col = xlsx[j];
        var temp = {};
        for (var k in col) {
            temp[xlsxName[k]] = col[k];
            if (xlsxName[k] == 'publishTime') {
                if(IsDate(col[k])){
                    continue;
                }
                var date = new Date(1900, 0, 0, 0, 0, 0);
                date.setDate(date.getDate() + col[k] - 1);
                if (isNaN(col[k])) {
                        return {
                            msg: -1,
                            msgInfo: '日期格式不对 行：' + j + '列：' + (+k + 1)
                        }
                }
                temp[xlsxName[k]] = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
            }

        }
        if (temp['source']) {
            xlsxData.push(temp);
        }
    }
    return xlsxData;
}
units.IsDate = IsDate;
units.xlsxParse =xlsxParse;
module.exports = units;
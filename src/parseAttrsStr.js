// 把attrsStr变成数组返回
export default function parseAttrsStr(attrsStr) {
    if (attrsStr == undefined) return [];
    // 当前字符是否在引号里
    let isYinhao = false;
    // 断点
    let point = 0;
    // 结果数组
    let result = [];
    // 遍历attrsStr
    for (var i = 0; i < attrsStr.length; i++) {
        // 每个字符
        let char = attrsStr[i];
        // char是" 时，改变isYinhao的值
        if (char == '"') {
            isYinhao = !isYinhao;
        } else if (char == ' ' && !isYinhao) {
            // 字符是空格(不是空)，并且字符不再引号里
            // 如果这项到断点之前的字符串不是空推入数组
            if (!/^\s*$/.test(attrsStr.substring(point, i)))
            // .trim()是ES6方法可以去掉首位空格
                result.push(attrsStr.substring(point, i).trim());
            // 把i重新设置为断点
            point = i;

        }
    }
    // 循环结束后，最后一项属性也放到result中
    result.push(attrsStr.substring(point).trim());
    // 将result中[k="v"]变成{name:"k",value:"v"}的形式
    result = result.map(item => {
        // 根据等号拆分
        const n = item.match(/^(.+)="(.+)"$/);
        return {
            name: n[1],
            value: n[2]
        };
    });
    return result;
};
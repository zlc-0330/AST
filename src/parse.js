// parse函数，主函数
import parseAttrsStr from './parseAttrsStr.js';
export default function parse(templateStr) {
    // 指针
    var index = 0;
    // 开始标记
    var startRegExp = /^\<([a-z]+[1-6]?)(\s[^\<]+)?\>/;
    // 结束标记
    var endRegExp = /^\<\/([a-z]+[1-6]?)\>/;
    // 结束标记前的文字
    var wordRegExp = /^([^\<]+)\<\/([a-z]+[1-6]?)\>/;
    // 两个栈,分别存放标签和数组
    var stack1 = [];
    var stack2 = [{ 'children': [] }];
    while (index < templateStr.length - 1) {
        // 剩余部分
        let rest = templateStr.substring(index);
        // 遍历到'<>'开始标签时
        if (startRegExp.test(rest)) {
            // 得到标签
            let tag = rest.match(startRegExp)[1];
            // 得到attrsStr
            let attrsStr = rest.match(startRegExp)[2];
            // console.log('检测到开始标记', tag);
            // 开始标记和数组入栈
            stack1.push(tag);
            stack2.push({ 'tag': tag, 'children': [], 'attrs': parseAttrsStr(attrsStr) });
            // attrsStr的长度
            const attrsStrLength = attrsStr != null ? attrsStr.length : 0;
            // 指针移动标签的长度加2再加attrsStr的长度(<>占两位)
            index += tag.length + 2 + attrsStrLength;
        } else if (endRegExp.test(rest)) {
            // 遍历到'</>'结束标签时
            let tag = rest.match(endRegExp)[1];
            // console.log('检测到结束标记', tag);
            // tag和栈1的栈1顶部一定相同，不然就是标签没封闭
            let popTag = stack1.pop();
            if (tag == popTag) {
                // 弹栈
                let popArr = stack2.pop();
                if (stack2.length > 0) {
                    stack2[stack2.length - 1].children.push(popArr);
                }
            } else {
                throw new Error(popTag + '标签没有封闭！');
            }
            // 指针移动标签的长度加3(</>占两位)
            index += tag.length + 3;
            // console.log(JSON.stringify(stack2));
        } else if (wordRegExp.test(rest)) {
            // 遍历到文字时
            let word = rest.match(wordRegExp)[1];
            // 看文字是不是空
            if (!/^\s+$/.test(word)) {
                // 不是空
                // console.log('检测到文字', word);
                // 将文字放到Stack2的栈顶元素中
                stack2[stack2.length - 1].children.push({ 'text': word, 'type': 3 });
            }
            // 指针移动文字的长度
            index += word.length;
        } else {
            index++;
        }
    }
    // 此时stack2就是我们之前默认放置的一项，此时返回这一项的children的第0项即可
    return stack2[0].children[0];

};
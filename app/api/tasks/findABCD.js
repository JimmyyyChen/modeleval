// 正则表达式寻找模型给出的选择题答案
function findABCD(answerstr) {
    const regex = /[A-D]/g;
    let match;
    while ((match = regex.exec(answerstr)) != null) {
        return match[0];
    }
}

module.exports = findABCD;
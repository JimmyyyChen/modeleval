const str = '["string1", "string2", "string3"]';
const regex = /^\["([^"]*)"(?:, "([^"]*)")*\]$/;
let match;
const result = [];

if ((match = regex.exec(str)) !== null) {
    for (let i = 1; i < match.length; i++) {
        result.push(match[i]);
    }
}

console.log(result); // 输出: ['string1', 'string2', 'string3']
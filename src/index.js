import parse from './parse.js';
var templateStr = `<div>
        <h3 class="box" id="3">你好</h3>
        <ul>
            <li>A</li>
            <li>B</li>
            <li>C</li>
            <li>D</li>
        </ul>
</div>
`;
const ast = parse(templateStr);
console.log(ast);
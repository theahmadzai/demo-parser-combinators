const Parser = require('../parser');
const { endOfInput } = require('../helpers');

const match = fn => new Parser(state => {
    if (state.isError) return state;

    const { code, index } = state;

    if (endOfInput(state)) {
        return state.updateError(`match: Got Unexepcted end of input.`)
    }

    let slicedTarget = code.slice(index);
    let pos = 0;

    while (pos <= slicedTarget.length - 1 && fn(slicedTarget[pos].charCodeAt(0))) pos++;

    if (pos > 0) {
        return state.update(pos, slicedTarget.slice(0, pos));
    }
    console.log('Error')
    return state.updateError(`match: Couldn't match ${slicedTarget.slice(0, 5)} at index ${index}`);
});

module.exports = match;

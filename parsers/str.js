const Parser = require('../parser');
const { endOfInput } = require('../helpers');

const str = s => new Parser(state => {
    if (state.isError) return state;

    const { code, index } = state;

    if (endOfInput(state)) {
        return state.updateError(`str: Tried to match "${s}", but got Unexepcted end of input.`)
    }

    let slicedTarget = code.slice(index);

    if (slicedTarget.startsWith(s)) {
        return state.update(s.length, s);
    }

    return state.updateError(`str: Tried to match "${s}", but got ${slicedTarget.slice(0, 5)}`);
});

module.exports = str;

const Parser = require('../parser');

const many = (parser, n = 0) => new Parser(state => {
    if (state.isError) return state;

    let result = [];

    while (true) {
        let nextState = parser.parserStateTransformer(state);

        if (nextState.isError) break;

        result.push(nextState.result);
        state = nextState;
    }

    if (n != 0 && result.length < n) {
        return state.updateError(`Many: Unable to match any input using parser at ${state.index}`);
    }

    return state.updateResult(result);
});

module.exports = many;

const Parser = require('../parser');

const sequenceOf = parsers => new Parser(state => {
    if (state.isError) return state;

    let result = [];
    let nextState = state;

    for (let parser of parsers) {
        nextState = parser.parserStateTransformer(nextState);
        result.push(nextState.result);
    }

    return nextState.updateResult(result);
});

module.exports = sequenceOf;

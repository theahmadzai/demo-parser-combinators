const Parser = require('../parser');

const choice = parsers => new Parser(state => {
    if (state.isError) return state;

    for (let parser of parsers) {
        let nextState = parser.parserStateTransformer(state);
        if (!nextState.isError) return nextState;
    }

    return state.updateError(`choice: Unable to match with any parser at index ${state.index}`);
});

module.exports = choice;

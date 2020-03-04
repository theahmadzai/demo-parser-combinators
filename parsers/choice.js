const Parser = require('../parser');

const choice = parsers => new Parser(state => {
    if (state.isError) return state;

    for (let parser of parsers) {
        console.log('PPP')
        let nextState = parser.parserStateTransformer(state);
        console.log('PPPmm', nextState.isError)
        if (!nextState.isError) {
            console.log('RUN')
            return nextState;
        }
        console.log('RUN')

    }

    return state.updateError(`choice: Unable to match with any parser at index ${state.index}`);
});

module.exports = choice;

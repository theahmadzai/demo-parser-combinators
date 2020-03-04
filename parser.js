const State = require('./state');

const Parser = function (parserStateTransformer) {
    this.parserStateTransformer = parserStateTransformer;
};

Parser.prototype.run = function (code) {
    State.code = code;
    return this.parserStateTransformer(State);
};

Parser.prototype.map = function (fn) {
    return new Parser(state => {
        state = this.parserStateTransformer(state);

        if (state.isError) return state;

        return state.updateResult(fn(state.result));
    });
};

Parser.prototype.chain = function (fn) {
    return new Parser(state => {
        let nextState = this.parserStateTransformer(state);

        if (nextState.isError) return state;

        let nextParser = fn(nextState.result);

        return nextParser.parserStateTransformer(nextState);
    });
};

Parser.prototype.mapError = function (fn) {
    return new Parser(state => {
        state = this.parserStateTransformer(state);

        if (!state.isError) return state;

        return state.updateError(fn(state.error, state.index));
    });
};

module.exports = Parser;

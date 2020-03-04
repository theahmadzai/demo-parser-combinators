const State = require('./state');

const Parser = function (parserStateTransformer) {
    this.parserStateTransformer = parserStateTransformer;
};

Parser.prototype.run = function (code) {
    State.code = code;
    return this.parserStateTransformer(State);
};

Parser.prototype.map = function (fn) {
    return new Parser(parserState => {
        parserState = this.parserStateTransformer(parserState);

        if (parserState.isError) return parserState;

        return parserState.updateResult(fn(parserState.result));
    });
};

Parser.prototype.mapError = function (fn) {
    return new Parser(parserState => {
        parserState = this.parserStateTransformer(parserState);

        if (!parserState.isError) return parserState;

        return parserState.updateError(fn(parserState.error, parserState.index));
    });
};

module.exports = Parser;

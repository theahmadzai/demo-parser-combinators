const lettersRegex = /^[A-Za-z]+/;
const digitsRegex = /^[0-9]+/;

const updateParserState = (state, index, result) => ({
    ...state,
    index,
    result
});

const updateParserResult = (state, result) => ({
    ...state,
    result
});

const updateParserError = (state, errorMsg) => ({
    ...state,
    isError: true,
    error: errorMsg
});

const Parser = function (parserStateTransformer) {
    this.parserStateTransformer = parserStateTransformer;
};

Parser.prototype.run = function (parser, targetString) {
    const initialState = {
        targetString,
        index: 0,
        result: null,
        isError: false,
        error: null
    };

    return this.parserStateTransformer(initialState);
};

Parser.prototype.map = function (fn) {
    return new Parser(parserState => {
        parserState = this.parserStateTransformer(parserState);

        if(parserState.isError) return parserState;

        return updateParserResult(parserState, fn(parserState.result));
    });
};

Parser.prototype.mapError = function (fn) {
    return new Parser(parserState => {
        parserState = this.parserStateTransformer(parserState);

        if(!parserState.isError) return parserState;

        return updateParserError(parserState, fn(parserState.error, parserState.index));
    });
};

const letters = new Parser(parserState => {
    if(parserState.isError) {
        return parserState;
    }

    const { targetString, index } = parserState;

    let slicedTarget = targetString.slice(index);

    if(slicedTarget.length === 0) {
        return updateParserError(
            parserState,
            `letters: Got Unexepcted end of input.`
        )
    }

    const regexMatch = slicedTarget.match(lettersRegex);

    if (regexMatch) {
        return updateParserState(parserState, index + regexMatch[0].length, regexMatch[0]);
    }

    return updateParserError(
        parserState,
        `letters: Couldn't match letters at index ${ index }`
    );
});

const digits = new Parser(parserState => {
    if(parserState.isError) {
        return parserState;
    }

    const { targetString, index } = parserState;

    let slicedTarget = targetString.slice(index);

    if(slicedTarget.length === 0) {
        return updateParserError(
            parserState,
            `digits: Got Unexepcted end of input.`
        )
    }

    const regexMatch = slicedTarget.match(digitsRegex);

    if (regexMatch) {
        return updateParserState(parserState, index + regexMatch[0].length, regexMatch[0]);
    }

    return updateParserError(
        parserState,
        `digits: Couldn't match digits at index ${ index }`
    );
});

const str = s => new Parser(parserState => {
    if(parserState.isError) {
        return parserState;
    }

    const { targetString, index } = parserState;

    let slicedTarget = targetString.slice(index);

    if(slicedTarget.length === 0) {
        return updateParserError(
            parserState,
            `str: Tried to match "${ s }", but got Unexepcted end of input.`
        )
    }

    if (slicedTarget.startsWith(s)) {
        return updateParserState(parserState, index + s.length, s);
    }

    return updateParserError(
        parserState,
        `str: Tried to match "${ s }", but got ${ targetString.slice(index, index + 10) }`
    );
});

const sequenceOf = function(parsers) {
    return new Parser(parserState => {
        if(parserState.isError) {
            return parserState;
        }

        let results = [];

        for(let parser of parsers) {
            parserState = parser.parserStateTransformer(parserState);

            if(!parserState.isError) {
                results.push(parserState.result);
            }
        }

        return updateParserResult(parserState, results);
    });
};

const choice = function(parsers) {
    return new Parser(parserState => {
        if(parserState.isError) {
            return parserState;
        }

        for(let parser of parsers) {
            const nextState = parser.parserStateTransformer(parserState);

            if(!nextState.isError) {
                return nextState;
            }
        }

        return updateParserError(
            parserState,
            `choice: Unable to match with any parser at index ${ parserState.index }`
        );
    });
};

const many = function(parser) {
    return new Parser(parserState => {
        if(parserState.isError) {
            return parserState;
        }

        let results = [];

        while(true) {
            let testState = parser.parserStateTransformer(parserState);

            if(!testState.isError) {
                results.push(testState.result);
                parserState = testState;
            } else {
                break;
            }
        }

        return updateParserResult(parserState, results);
    });
};

const parser = sequenceOf([
    str('hello').map(s => s.toUpperCase()),
    str('j').mapError((msg, index) => `Nore more input left :( index: ${ index }`),
    many(choice([
        digits, letters
    ])),
]);


console.log(
    parser.run(parser, 'helloj123abc123')
);

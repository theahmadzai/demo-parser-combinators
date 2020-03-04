const Parser = require('./parser');
const Str = require('./parsers/str');
const SequenceOf = require('./parsers/sequenceof');
const Match = require('./parsers/match');
const Choice = require('./parsers/choice');
const Many = require('./parsers/many');
const Type = require('./utils');

const parser = SequenceOf([
    Choice([
        Match(Type.isDigit),
        Match(Type.isLetter),
    ]),
    Many(Match(Type.isDigit), 1)
]);

console.log(
    parser.run('int7')
);

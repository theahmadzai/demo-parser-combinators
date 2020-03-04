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
]);

console.log(
    parser.run('inta=555a533')
);

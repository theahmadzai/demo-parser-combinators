const Parser = require('./parser');
const Str = require('./parsers/str');
const SequenceOf = require('./parsers/sequenceof');
const Match = require('./parsers/match');
const Choice = require('./parsers/choice');
const Many = require('./parsers/many');
const Type = require('./utils');

const Between = (leftParser, rightParser) => contentParser => SequenceOf([
    leftParser,
    contentParser,
    rightParser
]).map(r => r[1])


const BetweenBrackets = Between(Str('('), Str(')'));
const BetweenCurly = Between(Str('{'), Str('}'))

const StringParser = Match(Type.isLetter)
const NumberParser = Match(Type.isDigit).map(r => Number(r))
const HexParser = SequenceOf([
    Str('#'),
    Match(Type.isHex)
]).map(([, r]) => `#${r}`)

const PropertyParser = SequenceOf([
    Many(Str(' ')),
    Match(Type.isLetter),
    Many(Str(' ')),
    Str(':'),
]).map(([, r]) => r).chain(property => {
    switch (property) {
        case 'color': return { property, value: HexParser };
        case 'width': return NumberParser;
        case 'background': return StringParser;
        default: return Match(Type.isLetter);
    }
});

const parser = SequenceOf([
    // Match(Type.isLetter),
    // BetweenCurly(Many(SequenceOf([
    //     Match(Type.isLetter),
    //     Str(':'),
    //     Match(Type.isLetter),
    //     Str(';')
    // ]))),
    PropertyParser
]);

// var r = parser.run('body{color:red;display:block;}#ab33')
var r = parser.run('color:#abc')

console.log(r);
console.log(JSON.stringify(r.result));

const isNewline = (c) => (
    c === 0xA
)

const isTab = (c) => (
    c === 0x9
)

const isWhitespace = (c) => (
    c === 0x20
)

const isDigit = (c) => (
    c >= 0x30 && c <= 0x39
)

const isUppercaseHex = (c) => (
    isDigit(c) || (c >= 0x41 && c <= 0x46)
)

const isLowercaseHex = (c) => (
    isDigit(c) || (c >= 0x61 && c <= 0x66)
)

const isHex = (c) => (
    isUppercaseHex(c) || isLowercaseHex(c)
)

const isUppercaseLetter = (c) => (
    c >= 0x41 && c <= 0x5A
)

const isLowercaseLetter = (c) => (
    c >= 0x61 && c <= 0x7A
)

const isLetter = (c) => (
    isUppercaseLetter(c) || isLowercaseLetter(c)
)

module.exports = {
    isNewline,
    isTab,
    isWhitespace,
    isDigit,
    isUppercaseHex,
    isLowercaseHex,
    isHex,
    isUppercaseLetter,
    isLowercaseLetter,
    isLetter,
}

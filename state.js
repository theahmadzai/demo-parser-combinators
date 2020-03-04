const State = {
    code: null,
    index: 0,
    result: null,
    isError: false,
    error: null,

    update: function (index, result) { return { ...this, index: this.index + index, result } },
    updateResult: function (result) { return { ...this, result } },
    updateError: function (error) { return { ...this, error } }
}

module.exports = State;

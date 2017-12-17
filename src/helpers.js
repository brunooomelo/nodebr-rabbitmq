exports.JSONtoBuffer = (obj) => {
    return new Buffer(JSON.stringify(obj))
}
exports.BuffertoJSON = (buff) => {
    return JSON.parse(buff.toString())
}
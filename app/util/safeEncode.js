module.exports.encode = function(str) {
    return encodeURI(str.replace(/'/g, "%27"));
}

module.exports.decode = function(str) {
    return decodeURI(str).replace(/%27/g, "'");
}
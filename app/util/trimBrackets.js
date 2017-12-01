module.exports = function(str) {
    const BRACKETS_RE = /^\[|\]$/g;
    return str.replace(BRACKETS_RE, '');
}

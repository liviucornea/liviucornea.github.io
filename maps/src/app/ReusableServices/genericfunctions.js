"use strict";
function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}
exports.replaceAll = replaceAll;
function getIdValue(obj, primaryKeyColumn) {
    var Id;
    if (!primaryKeyColumn) {
        primaryKeyColumn = 'Id';
    }
    for (var i = 0; i < Object.keys(obj).length; i++) {
        if (Object.keys(obj)[i] === primaryKeyColumn || Object.keys(obj)[i] === 'Id') {
            Id = obj[Object.keys(obj)[i]];
            break;
        }
    }
    return Id;
}
exports.getIdValue = getIdValue;
function toDateString(date) {
    return (date.getUTCFullYear().toString() + '-' +
        ('0' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
        ('0' + (date.getUTCDate())).slice(-2));
}
exports.toDateString = toDateString;
function toUTCDate(date) {
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
}
exports.toUTCDate = toUTCDate;
function toCamelCase(input) {
    return input.toLowerCase().split(' ').map(function (word) {
        return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
}
exports.toCamelCase = toCamelCase;
//# sourceMappingURL=genericfunctions.js.map

export function getIdValue(obj, primaryKeyColumn) {
    let Id;
    if (!primaryKeyColumn) {
        primaryKeyColumn = "Id";
    }

    for (let i = 0; i < Object.keys(obj).length; i++) {
        if (Object.keys(obj)[i] === primaryKeyColumn || Object.keys(obj)[i] === "Id") {
            Id = obj[Object.keys(obj)[i]];
            break;
        }
    }

    return Id;
}

export function toDateString(date: Date): string {
    return (date.getUTCFullYear().toString() + '-' +
    ("0" + (date.getUTCMonth() + 1)).slice(-2) + '-' +
    ("0" + (date.getUTCDate())).slice(-2));
}

export function toUTCDate(date: Date) {
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),  date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
}

export function toCamelCase(input) {
    return input.toLowerCase().split(' ').map(function(word) {
        return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ')
}

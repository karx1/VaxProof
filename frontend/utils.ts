function isBlank(str: string) {
    return (!str || /^\s*$/.test(str));
}

function isNotBlank(str: string) {
    return !(!str || /^\s*$/.test(str));
}

function assert(condition: boolean, message: string) {
    if (!condition) {
        throw new Error(message);
    }
}

export { isBlank, isNotBlank, assert };
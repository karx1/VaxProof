import React from "react";
import { Text } from "react-native-paper";

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

function Break() {
    return <Text />;
}

export { isBlank, isNotBlank, assert, Break };
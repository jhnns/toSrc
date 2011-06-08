var toSource = require('../lib/toSource'),
    assert = require('assert');

var referenceTestObj = {
    "one": "one",
    "two": 2
};

var testObj = {
    "string1": "this is a string",
    "string2": new String("this is a string"),
    "number1": 2,
    "number2": new Number(2),
    "MAX_VALUE": Number.MAX_VALUE,
    "MIN_VALUE": Number.MIN_VALUE,
    "POSITIVE_INFINITY": Number.POSITIVE_INFINITY,
    "NEGATIVE_INFINITY": Number.NEGATIVE_INFINITY,
    "NaN": Number.NaN,
    "MathE": Math.E,
    "MathLN2": Math.LN2,
    "MathLN10": Math.LN10,
    "Math.LOG2E": Math.LOG2E,
    "Math.LOG10E": Math.LOG10E,
    "Math.PI": Math.PI,
    "Math.SQRT1_2": Math.SQRT1_2,
    "Math.SQRT2": Math.SQRT2,
    "boolean1": true,
    "boolean2": new Boolean(1),
    "functionTest": function() {
        console.log("hello");
    },
    "array": [1, 2, 3, true, "hello"],
    "complexArray": [
        function() {
            console.log("test");
        },
        {
            "string": "test1",
            "number": 2342
        },
        [
            1,2,3
        ]
    ],
    "regEx1": /dasd/gi,
    "regEx2": new RegExp("dasd"),
    "date": new Date("1955"),
    "nullValue": null,
    "undefinedValue": undefined,
    "emptyObj": {},
    "nestedObj": {
        "hello": function() {
            console.log("hello");
        }
    },
    "referenceTestObj": referenceTestObj
};

console.log(toSource(testObj));
eval('var copy = ' + toSource(testObj));
assert.ok(checkIdentity(testObj, copy));

function checkIdentity(source, copy) {
    var key;
    var result;
    
    if(typeof source === 'string' || source instanceof String) {
        return source === copy;
    } else if(typeof source === 'function' || source instanceof Function) {
        return source.toString() === copy.toString();
    } else if(typeof source === 'boolean' || source instanceof Boolean) {
        return source === copy;
    } else if(typeof source === 'number' || source instanceof Number) {
        return source === copy;
    } else if(source === null) {
        return source === copy;
    } else if(source instanceof RegEx) {
        return source.toString() === copy.toString();
    } else if(source instanceof Date) {
        return source.getTime() === copy.getTime();
    } else if(typeof source === 'object') {
        for(key in source) {
            console.log(key);
            //result = checkIdentity(source[key], copy[key]);
            if(result === false) {
                return false;
            }
        }
        return true;
    }
    
    return false;
}








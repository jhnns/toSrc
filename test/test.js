var toSource = require('../lib/toSource'),
    assert = require('assert');
    
function checkIdentity(source, copy) {
    var key,
        result;
    
    
    if(source === undefined || copy === undefined) {
        return source === copy;
    } else if(typeof source === 'string' || source instanceof String) {
        return source === copy;
    } else if(typeof source === 'function' || source instanceof Function) {
        return source.toString() === copy.toString();
    } else if(typeof source === 'boolean' || source instanceof Boolean) {
        return source === copy;
    } else if(typeof source === 'number' || source instanceof Number) {
        return source.toString() === copy.toString();   // .toString() necessary to check for NaN.
    } else if(source === null) {
        return source === copy;
    } else if(source instanceof RegExp) {
        return source.toString() === copy.toString();
    } else if(source instanceof Date) {
        return source.getTime() === copy.getTime();
    } else if(typeof source === 'object') {
        for(key in source) {
            result = checkIdentity(source[key], copy[key]);
            if(result === false) {
                return false;
            }
        }
        return true;
    }
    
    return false;
}

var referenceTestObj = {
    "one": "one",
    "two": 2
};

var testObj = {
    "string1": "this is a string",
    "number1": 2,
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

//////////////////////////////////////////////////////////////////////////////////
/* Example tests */

assert.equal(toSource(1), '1');
assert.equal(toSource(Math.PI), 'Math.PI');
assert.equal(toSource(true), 'true');
assert.equal(toSource("1"), '"1"');
assert.equal(toSource(/regex/gi), '/regex/gi');
assert.ok(
    /new Date\(\d+\)/gi.test(
        toSource(new Date())
    )
);
assert.equal(toSource(function() {
    var test = "hello";
}), 'function () {\n    var test = "hello";\n}'); 
assert.equal(toSource([1, 2, "3"]), '[1, 2, "3"]');
assert.equal(toSource({
    "1": 1,
    "regEx": /regex/gi,
    "anotherObj": {
        "test": "test"
    }
}), '{"1": 1, "regEx": /regex/gi, "anotherObj": undefined}');
    
//////////////////////////////////////////////////////////////////////////////////
/**
 * This test should fail, because the default depth is 1.
 * All nested structures will be undefined
 */
    
eval('var copy = ' + toSource(testObj));    // depth = 1
assert.equal(checkIdentity(testObj, copy), false);

//////////////////////////////////////////////////////////////////////////////////
/**
 * This test should also fail because depth=2 is insufficient.
 * complexArray[1] will be undefined.
 */

eval('var copy = ' + toSource(testObj, 2)); // depth = 2
assert.equal(checkIdentity(testObj, copy), false);

//////////////////////////////////////////////////////////////////////////////////
/**
 * This test should succeed
 */

eval('var copy = ' + toSource(testObj, 3)); // depth = 3
assert.equal(checkIdentity(testObj, copy), true);

//////////////////////////////////////////////////////////////////////////////////
/**
 * This test should also succeed. An so on...
 */
 
eval('var copy = ' + toSource(testObj, 4));
assert.equal(checkIdentity(testObj, copy), true);

//////////////////////////////////////////////////////////////////////////////////
/**
 * This test should fail, because the object contains a circular reference.
 */
 
testObj.circularRef = testObj
console.log('You should see a warning now...');
eval('var copy = ' + toSource(testObj, 3));
assert.equal(checkIdentity(testObj, copy), false);





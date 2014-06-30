**toSrc** [![Build Status](https://secure.travis-ci.org/jhnns/toSrc.png?branch=master)](http://travis-ci.org/jhnns/toSrc)
========

**Turns every JavaScript object or primitive into valid source
code that can be evaled again.**

You can use it to serialize classes, modules or other programming objects
and reuse them in an other environment such as a browser. JSON.stringify doesnt work with programming objects (that contain functions, dates, etc.) because they're no legal JSONs.

<br />

Installation
------------
`npm install toSrc`

<br />

Examples
-----

```javascript

    var toSrc = require("toSrc");
    
    // Primitives
    ///////////////////////////////////////
    toSrc(1); // = '1'
    toSrc(true); // = 'true'
    toSrc(undefined); // = 'undefined'
    tOSrc(null); // = null
    toSrc("1"); // = '"1"'
    toSrc('1'); // = '"1"' toSrc always uses double-quotes    

    // Constants
    ///////////////////////////////////////
    toSrc(Math.PI); // = 'Math.PI'
    toSrc(NaN); // = 'NaN'

    // RegExp
    ///////////////////////////////////////
    toSrc(/myRegEx/gi); // = '/myRegEx/gi'
    toSrc(new RegExp("myRegEx")); // = '/myRegEx/'

    // Date
    ///////////////////////////////////////
    toSrc(new Date()); // = 'new Date(<the time of creation in ms>)'

    // Functions
    ///////////////////////////////////////
    function testFunc() {
        var test = "hello";
    }
    toSrc(testFunc); // = 'function testFunc() {\n    var test = "hello";\n}'
    toSrc(String); // = 'String', native functions don't expose the source code

    // Arrays
    ///////////////////////////////////////
    toSrc([1, 2, "3"]); // = '[1, 2, "3"]'
    toSrc([1, 2, ["a", "b", "c"]]); // = '[1, 2, undefined]' because the depth
                                    // is 1 by default
    toSrc([1, 2, ["a", "b", "c"]], 2); // = '[1, 2, ["a", "b", "c"]]'

    // Objects
    ///////////////////////////////////////
    toSrc({
        regEx: /regex/gi,
        anotherObj: {
            test: "test"
        }
    });
    // = '{"regEx": /regex/gi, "anotherObj": undefined}'
    // anotherObj is undefined because the depth is 1 by default.
    toSrc({
        "regEx": /regex/gi,
        "anotherObj": {
            "test": "test"
        }
    }, 2);
    // = '{"regEx": /regex/gi, "anotherObj": {"test": "test"}}'

```

For more examples check out `test/test.js`

<br />



API
-----

###toSrc(obj: *, depth: Number): String

- *obj*: <br/>
The object to stringify. Can also be a primitive like `1` or `true`.

- *{Number=1} depth*:<br />
The depth to go. All nested structures like objects or arrays deeper than this will be undefined. Defaults to 1, meaning that every object or array within `obj` will be undefined by default.

<br />

Usage
-----

### In node.js

```javascript
var toSrc = require("toSrc");

toSrc(obj, depth);
```

### In the browser

Just call `toSrc(obj, depth);`

<br />

Notes
-----
* Circular references will be undefined. No error is thrown, but a warning is logged.
* All math constants are restored to their source representation, e.g.: `toSrc(Math.PI); // = 'Math.PI' instead of 3.14...`
* All dates are restored to their original time of creation, e.g.: `toSrc(new Date()) // = 'new Date(<time of creation in ms>)'`
* Dynamic regular expressions created via `new RegExp()` will **not** be dynamic anymore. `toSrc(new RegExp(someString))` will return `'/<value of someString>/'` instead of `'new RegExp(someString)'`

Feel free to modify the code to meet your needs.


<br />

## License

MIT

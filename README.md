toSource
========

This node.js module turns every JavaScript object or primitive into valid source
code. Useful to serialize classes, modules or other programming objects
and reuse them in another environment such as a browser, since JSON.stringify
doesnt convert functions, dates or RegEx.

Note: Unless you provide another depth parameter this module turns every nested
structure within the given object into undefined.

Usage
-----
The module returns a single function accepting these parameters:
+ obj: The object to stringify. Can be a primitive, too.
+ depth (optional): Specify the depth to process. All nested structures like objects or arrays deeper than this will be undefined. Defaults to 1.

Examples
-----

    var toSource = require('toSource');
    var obj = {
        "number": 1,
        "string": "hello",
        "date": new Date(),
        "regEx": /regex/gi
    };
    
    console.log(
        toSource(obj)
    );

    // results in {"number":1,"string":"hello","date": new Date(),"regEx": /regex/gi};
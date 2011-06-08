/**
 * <p><b>MODULE: toSource</b></p>
 * 
 * <p>Converts any object to valid source code.</p>
 * 
 * <p>If you dont pass a depth-parameter, all objects within an object or an
 * array are converted to undefined.</p>
 * 
 * @requires third-party: underscore http://documentcloud.github.com/underscore/
 * 
 * @version 0.1.0
 */

var _ = require('underscore');



/**
 * <p>Modifies the key-string, so it looks like an ordinary setter.</p>
 * <p>_someProperty becomes setSomeProperty</p>
 * 
 * @private
 * @param {String} key
 * @returns {String} key
 */
function checkTypeOf(obj) {
    if(typeof obj === 'string' || obj instanceof String) {
        return '"'+ obj + '"';
    } else if(typeof obj === 'function' || obj instanceof Function) {
        return obj.toString();
    } else if(typeof obj === 'boolean' || obj instanceof Boolean) {
        return obj.toString();
    } else if(typeof obj === 'number' || obj instanceof Number) {
        if(obj === Number.MAX_VALUE) {
            return 'Number.MAX_VALUE';
        } else if(obj === Number.MIN_VALUE) {
            return 'Number.MIN_VALUE';
        } else if(obj === Math.E) {
            return 'Math.E';
        } else if(obj === Math.LN2) {
            return 'Math.LN2';
        } else if(obj === Math.LN10) {
            return 'Math.LN10';
        } else if(obj === Math.LOG2E) {
            return 'Math.LOG2E';
        } else if(obj === Math.LOG10E) {
            return 'Math.LOG10E';
        } else if(obj === Math.PI) {
            return 'Math.PI';
        } else if(obj === Math.SQRT1_2) {
            return 'Math.SQRT1_2';
        } else if(obj === Math.SQRT2) {
            return 'Math.SQRT2';
        } else {
            return obj;
        }
    } else if(obj === null) {
        return 'null';
    } else {
        return undefined;
    }
}

function toSource(obj, depth) {
    var nativesResult;
    
    if(depth === undefined) {
        depth = 1;
    }
    if(typeof obj === 'object') {
        var objString,
            key,
            i;
            
        if(obj instanceof Array) {
            objString = '[';
            
            if(depth > 0) {
                for(i=0; i<obj.length; i++) {
                    objString += toSource(obj[i], depth - 1) + ', ';
                }
                if(objString.length > 1) {
                    objString = objString.substring(0, objString.length - 2);
                }                
            }
            objString += ']';
            
            return objString;
        } else if(obj instanceof RegExp) {
            return obj.toString();
        } else if(obj instanceof Date) {
            return 'new Date(' + obj.getTime() + ')';
        } else {
            nativesResult = checkTypeOf(obj);
            if(nativesResult === undefined) {
                objString = '{';
                
                if(depth > 0) {
                    for(key in obj) {
                        if(obj.hasOwnProperty(key)) {
                            objString += '"' + key + '": ' + toSource(obj[key], depth - 1) + ', ';
                        }
                    }
                    if(objString.length > 1) {
                        objString = objString.substring(0, objString.length - 2);
                    }
                }
                objString += '}';

                return objString;
            } else {
                return nativesResult;
            }
        }
    } else {
        nativesResult = checkTypeOf(obj);
        if(nativesResult === undefined) {
            return 'undefined';
        } else {
            return nativesResult;
        }
    }
}

module.exports = toSource;

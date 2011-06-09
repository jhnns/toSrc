/**
 * <p><b>MODULE: toSource</b></p>
 * 
 * <p>Converts any object into valid source code.</p>
 * 
 * <p>If you dont pass a depth-parameter, all objects within an object or an
 * array are converted to undefined.</p>
 * 
 * @version 0.1.0
 */

// Requirements

// Variables
var knownObjs = []; // stores all nested structures that have been processed to detect circular references


/**
 * <p>Checks if the object is typeof 'string', 'function', 'boolean', 'number'
 * or equals null. The instanceof operator is used additionally, because a string
 * constructed with new String() will not be typeof 'string'.</p>
 * 
 * <p>This function returns a string or undefined. In case of the returned value
 * is undefined, the given object may actual be undefined or an object that is not
 * one of those described above.</p>
 * 
 * @private
 * @param {String} key
 * @returns {Mixed} key
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



/**
 * <p>Converts any object into valid source code.</p>
 * 
 * <p>If you dont pass a depth-parameter, it will default to 1. In this case
 * all objects within an object or an array are converted to undefined.</p>
 * 
 * @private
 * @param {Mixed} obj
 * @param {Integer} depth
 * @returns {String} source code
 */
function toSource(obj, depth) {
    var typeOfResult;
    
    if(depth === undefined) {
        depth = 1;
    }
    if(typeof obj === 'object') {
        var objString,
            key,
            i;
            
        if(obj instanceof Array) {
            if(depth > 0) {
                if(knownObjs.indexOf(obj) !== -1) {
                    console.log('toSource warning: Circular reference detected within array ', obj);
                    return 'undefined';
                } else {
                    knownObjs.push(obj);
                }
                objString = '[';
                for(i=0; i<obj.length; i++) {
                    objString += toSource(obj[i], depth - 1) + ', ';
                }
                if(objString.length > 1) {
                    objString = objString.substring(0, objString.length - 2);
                }                
                objString += ']';
            } else {
                objString = 'undefined';
            }
            
            return objString;
        } else if(obj instanceof RegExp) {
            return obj.toString();
        } else if(obj instanceof Date) {
            return 'new Date(' + obj.getTime() + ')';
        } else {
            typeOfResult = checkTypeOf(obj);
            if(typeOfResult === undefined) {
                if(depth > 0) {
                    if(knownObjs.indexOf(obj) !== -1) {
                        console.log('toSource warning: Circular reference detected within object ', obj);
                        
                        return 'undefined';
                    } else {
                        knownObjs.push(obj);
                    }
                    objString = '{';
                    for(key in obj) {
                        if(obj.hasOwnProperty(key)) {
                            objString += '"' + key + '": ' + toSource(obj[key], depth - 1) + ', ';
                        }
                    }
                    if(objString.length > 1) {
                        objString = objString.substring(0, objString.length - 2);
                    }
                    objString += '}';
                } else {
                    objString = 'undefined';
                }

                return objString;
            } else {
                return typeOfResult;
            }
        }
    } else {
        typeOfResult = checkTypeOf(obj);
        if(typeOfResult === undefined) {
            return 'undefined';
        } else {
            return typeOfResult;
        }
    }
}



/**
 * <p>Converts any object into valid source code.</p>
 * 
 * <p>If you dont pass a depth-parameter, it will default to 1. In this case
 * all objects within an object or an array are converted to undefined.</p>
 * 
 * @param {Mixed} obj
 * @param {Integer} depth
 * @returns {String} source code
 */
module.exports = function(obj, depth) {
    var result = toSource(obj, depth);
    
    knownObjs = []; // resetting the knownObjs
    
    return result;
};

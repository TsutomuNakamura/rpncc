[![Build Status](https://travis-ci.org/TsutomuNakamura/rpncc.svg?branch=develop)](https://travis-ci.org/TsutomuNakamura/rpncc)
# rpncc

This is a program for Reverse Polish notation utility.
It converts or calculates a expressions to Reverse Polish notation.

## Use examples
First, install this module in your project.
```console
$ npm install rpncc
```

Import this module in your source code and call like below.
```javascript
var Rpncc = require('rpncc');
var rpn   = new Rpncc();

console.log(rpn.convert(["1", "+", "2", "*", "3"]));     // -> [ '1', '2', '3', '*', '+' ]
console.log(rpn.calculate([ '1', '2', '3', '*', '+' ])); // -> 7
console.log(rpn.revert([ '1', '2', '3', '*', '+' ]));    // -> ["1", "+", "2", "*", "3"]
```

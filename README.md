# rpncc
[![Build Status](https://travis-ci.org/TsutomuNakamura/rpncc.svg?branch=develop)](https://travis-ci.org/TsutomuNakamura/rpncc) 
[![Dependency Status](https://gemnasium.com/badges/github.com/TsutomuNakamura/rpncc.svg)](https://gemnasium.com/github.com/TsutomuNakamura/rpncc)
[![npm](https://img.shields.io/npm/v/chance.svg)](https://npmjs.com/package/rpncc)
[![GitHub license](https://img.shields.io/github/license/TsutomuNakamura/rpncc.svg)](https://github.com/TsutomuNakamura/rpncc)

This is a program for Reverse Polish notation utility.
It converts or calculates a expressions to Reverse Polish notation.

## Use examples
First, install this module in your project.
```console
$ npm install rpncc
```

Import this module in your source code and call like below.
```javascript
var Rpn = require('rpncc');
var rpn = new Rpn();

console.log(rpn.convert(["1", "+", "2", "*", "3"]));     // -> [ '1', '2', '3', '*', '+' ]
console.log(rpn.calculate([ '1', '2', '3', '*', '+' ])); // -> 7
console.log(rpn.revert([ '1', '2', '3', '*', '+' ]));    // -> ["1", "+", "2", "*", "3"]
```

## License
This software is released under the MIT License, see LICENSE.txt.


var chance = require('chance').Chance();

function Rpncc() {
    var myself          = this;

    /** Operators allowed in this program. These values declare the precedence. */
    const operators       = {
                                "^": 4,
                                "*": 3, "/": 3,
                                "+": 2, "-": 2,
                                "(": 1,
                                "=": 0
                          };

    var instractions = {};
    instractions['^'] = function(arg1, arg2) { return Math.pow(Number(arg1), Number(arg2)); };
    instractions['*'] = function(arg1, arg2) { return Number(arg1) * Number(arg2); };
    instractions['/'] = function(arg1, arg2) { return Number(arg1) / Number(arg2); };
    instractions['+'] = function(arg1, arg2) { return Number(arg1) + Number(arg2); };
    instractions['-'] = function(arg1, arg2) { return Number(arg1) - Number(arg2); };

    const I_LEFT_NODE   = 0;
    const I_OPERATOR    = 1;
    const I_RIGHT_NODE  = 2;

    this.convert = function(expression) {
        var priority;       /* The priority of the operation */
        var argument;       /* The temporary region of an argument */
        var stack = [], result = [];

        for(var i = 0; i < expression.length; ++i) {
            argument = expression[i];
            if(argument === "(") {
                stack.push(argument);
            } else if(argument === ")") {
                while((argument = stack.pop()) !== "(") {
                    result.push(argument);
                }
            } else {
                if(priority = operators[argument]) {  /* An expression */
                    while(stack.length > 0
                            && (operators[stack[stack.length - 1]] >= priority && argument !== "^")) {
                        result.push(stack.pop());
                    }
                    stack.push(argument);
                } else {  /* A number */
                    result.push(argument);
                }
            }
        }

        return result.concat(stack.reverse());
    };

    this.calculate = function(expression) {
        var instraction;       /* The priority of the operation */
        for(var i = 0; i < expression.length; ++i) {
            if(instraction = instractions[expression[i]]) {
                expression[i] = instraction(expression[i - 2], expression[i - 1]);
                expression.splice(i = (i - 2), 2);
            }
        }

        return (expression.length === 1? expression[0]: undefined);
    };

    this.revert = function(expression) {
        var argument;
        var stack = [];

        for(var i = 0; i < expression.length; ++i) {
            argument = expression[i];
            if(operators[argument]) {
                var right = stack.pop();
                var left  = stack.pop();
                stack.push([left, argument, right]);
            } else {
                stack.push(argument);
            }
        }

        return myself.convert_reverted_to_array(stack[0]);
    };

    this.convert_reverted_to_array = function(tree) {
        if(!Array.isArray(tree)) return tree;

        var left    = myself.convert_reverted_to_array(tree[I_LEFT_NODE]);
        var right   = myself.convert_reverted_to_array(tree[I_RIGHT_NODE]);

        if(Array.isArray(tree[I_LEFT_NODE])
                && (operators[tree[I_LEFT_NODE][I_OPERATOR]] < operators[tree[I_OPERATOR]]
                || tree[I_LEFT_NODE][I_OPERATOR] === tree[I_OPERATOR] && tree[I_OPERATOR] === '^')) {
            left.unshift('(');
            left.push(')');
        }

        if(Array.isArray(tree[I_RIGHT_NODE])
                && (operators[tree[I_RIGHT_NODE][I_OPERATOR]] < operators[tree[I_OPERATOR]])
                || (tree[I_RIGHT_NODE][I_OPERATOR] === tree[I_OPERATOR] && tree[I_OPERATOR] === '/')) {
            right.unshift('(');
            right.push(')');
        }

        if(!Array.isArray(left)) left = [left];

        return left.concat(tree[I_OPERATOR], right);
    };

    this.convert_by_someone = function(expression) {

        var err = undefined;
        var result = {representative: chance.name()};

        if (chance.bool({likelihood: 3})) {
            result.error = Error("Sorry, " + result.representative + " is absent right now.");
        } else {
            // Human sometimes take mistakes...
            result.answer = chance.bool({likelihood: 3})
                                ? chance.shuffle(expression)
                                : myself.convert(expression);
        };

        return new Promise(function (resolve) {
            setTimeout(
                resolve,
                chance.integer({min: 200, max: 3000}),
                result
            );
        });
    }
}
module.exports = Rpncc;


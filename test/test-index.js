import test from 'ava';
import Rpncc from '../index';
import './lib/load_prototypes';

const rpn = new Rpncc();

test('rpn#convert should return "1 2 +" if the value "1 + 2" is passed', t => {
    t.true(rpn.convert(["1", "+", "2"]).equals(["1", "2", "+"]));
});

test('rpn#convert should return "1 2 -" if the value "1 - 2" is passed', t => {
    t.true(rpn.convert(["1", "-", "2"]).equals(["1", "2", "-"]));
});

test('rpn#convert should return "1 2 *" if the value "1 * 2" is passed', t => {
    t.true(rpn.convert(["1", "*", "2"]).equals(["1", "2", "*"]));
});

test('rpn#convert should return "1 2 /" if the value "1 / 2" is passed', t => {
    t.true(rpn.convert(["1", "/", "2"]).equals(["1", "2", "/"]));
});

test('rpn#convert should return "1 2 3 * +" if the value "1 + 2 * 3" is passed', t => {
    t.true(rpn.convert(["1", "+", "2", "*", "3"]).equals(["1", "2", "3", "*", "+"]));
});

test('rpn#convert should return "1 2 / 3 -" if the value "1 / 2 - 3" is passed', t => {
    t.true(rpn.convert(["1", "/", "2", "-", "3"]).equals(["1", "2", "/", "3", "-"]));
});

test('rpn#convert should return "1 2 + 3 -" if the value "1 + 2 - 3" is passed', t => {
    t.true(rpn.convert(["1", "+", "2", "-", "3"]).equals(["1", "2", "+", "3", "-"]));
});

test('rpn#convert should return "1 2 * 3 /" if the value "1 * 2 / 3" is passed', t => {
    t.true(rpn.convert(["1", "*", "2", "/", "3"]).equals(["1", "2", "*", "3", "/"]));
});

test('rpn#convert should return "1 2 + 3 - 4 +" if the value "1 + 2 - 3 + 4" is passed', t => {
    t.true(rpn.convert(["1", "+", "2", "-", "3", "+", "4"]).equals(["1", "2", "+", "3", "-", "4", "+"]));
});

test('rpn#convert should return "1 2 * 3 / 4 *" if the value "1 * 2 / 3 * 4" is passed', t => {
    t.true(rpn.convert(["1", "*", "2", "/", "3", "*", "4"]).equals(["1", "2", "*", "3", "/", "4", "*"]));
});

test('rpn#convert should return "1 2 3 * 4 / +" if the value "1 + 2 * 3 / 4" is passed', t => {
    t.true(rpn.convert(["1", "+", "2", "*", "3", "/", "4"]).equals(["1", "2", "3", "*", "4", "/", "+"]));
});

test('rpn#convert should return "1 2 / 3 * 4 -" if the value "1 / 2 * 3 - 4" is passed', t => {
    t.true(rpn.convert(["1", "/", "2", "*", "3", "-", "4"]).equals(["1", "2", "/", "3", "*", "4", "-"]));
});

test('rpn#convert should return "1 2 + 3 4 * -" if the value "1 + 2 - 3 * 4" is passed', t => {
    t.true(rpn.convert(["1", "+", "2", "-", "3", "*", "4"]).equals(["1", "2", "+", "3", "4", "*", "-"]));
});

test('rpn#convert should return "1 2 3 / + 4 -" if the value "1 + 2 / 3 - 4" is passed', t => {
    t.true(rpn.convert(["1", "+", "2", "/", "3", "-", "4"]).equals(["1", "2", "3", "/", "+", "4", "-"]));
});

test('rpn#convert should return "1 2 * 3 + 4 -" if the value "1 * 2 + 3 - 4" is passed', t => {
    t.true(rpn.convert(["1", "*", "2", "+", "3", "-", "4"]).equals(["1", "2", "*", "3", "+", "4", "-"]));
});


test('rpn#calculate should return 3 if the value "1 2 +" is passed', t => {
    t.is(rpn.calculate(["1", "2", "+"]), 3);
});

test('rpn#calculate should return -1 if the value "1 2 -" is passed', t => {
    t.is(rpn.calculate(["1", "2", "-"]), -1);
});

test('rpn#calculate should return 2 if the value "1 2 *" is passed', t => {
    t.is(rpn.calculate(["1", "2", "*"]), 2);
});

test('rpn#calculate should return 0.5 if the value "1 2 /" is passed', t => {
    t.is(rpn.calculate(["1", "2", "/"]), 0.5);
});

test('rpn#calculate should return 7 if the value "1 2 3 * +" is passed', t => {
    t.is(rpn.calculate(["1", "2", "3", "*", "+"]), 7);
});

test('rpn#calculate should return -3.5 if the value "1 2 / 3 -" is passed', t => {
    t.is(rpn.calculate(["1", "2", "/", "3", "-"]), -2.5);
});

test('rpn#calculate should return 0 if the value "1 2 + 3 -" is passed', t => {
    t.is(rpn.calculate(["1", "2", "+", "3", "-"]), 0);
});

test('rpn#calculate should return 0.66... if the value "1 2 * 3 /" is passed', t => {
    const result = Math.floor(rpn.calculate(["1", "2", "*", "3", "/"]) * 100);
    t.true(result === 66 || result === 67);
});

test('rpn#calculate should return 4 if the value "1 2 + 3 - 4 +" is passed', t => {
    t.is(rpn.calculate(["1", "2", "+", "3", "-", "4", "+"]), 4);
});

test('rpn#calculate should return 2.66... if the value "1 2 * 3 / 4 *" is passed', t => {
    const result = parseInt(Math.floor(rpn.calculate(["1", "2", "*", "3", "/", "4", "*"])* 100));
    t.true(result === 266 || result === 267);
});

test('rpn#calculate should return 2.5 if the value "1 2 3 * 4 / +" is passed', t => {
    t.is(rpn.calculate(["1", "2", "3", "*", "4", "/", "+"]), 2.5);
});

test('rpn#calculate should return -2.5 if the value "1 2 / 3 * 4 -" is passed', t => {
    t.is(rpn.calculate(["1", "2", "/", "3", "*", "4", "-"]), -2.5);
});

test('rpn#calculate should return -9 if the value "1 2 + 3 4 * -" is passed', t => {
    t.is(rpn.calculate(["1", "2", "+", "3", "4", "*", "-"]), -9);
});

test('rpn#calculate should return -2.33... if the value "1 2 3 / + 4 -" is passed', t => {
    const result = parseInt(Math.floor(rpn.calculate(["1", "2", "3", "/", "+", "4", "-"]) * 100));
    t.true(result === -233 || result === -234);
});

test('rpn#calculate should return 1 if the value "1 2 * 3 + 4 -" is passed', t => {
    t.is(rpn.calculate(["1", "2", "*", "3", "+", "4", "-"]), 1);
});


test('rpn#revert should return "1 + 2" if the value "1 2 +" is passed', t => {
    t.true(rpn.revert(["1", "2", "+"]).equals(["1", "+", "2"]));
});

test('rpn#revert should return "1 - 2" if the value "1 2 -" is passed', t => {
    t.true(rpn.revert(["1", "2", "-"]).equals(["1", "-", "2"]));
});

test('rpn#revert should return "1 * 2" if the value "1 2 *" is passed', t => {
    t.true(rpn.revert(["1", "2", "*"]).equals(["1", "*", "2"]));
});

test('rpn#revert should return "1 / 2" if the value "1 2 /" is passed', t => {
    t.true(rpn.revert(["1", "2", "/"]).equals(["1", "/", "2"]));
});

test('rpn#revert should return "1 + 2 * 3" if the value "1 2 3 * +" is passed', t => {
    t.true(rpn.revert(["1", "2", "3", "*", "+"]).equals(["1", "+", "2", "*", "3"]));
});

test('rpn#revert should return "1 / 2 - 3" if the value "1 2 / 3 -" is passed', t => {
    t.true(rpn.revert(["1", "2", "/", "3", "-"]).equals(["1", "/", "2", "-", "3"]));
});

test('rpn#revert should return "1 + 2 - 3" if the value "1 2 + 3 -" is passed', t => {
    t.true(rpn.revert(["1", "2", "+", "3", "-"]).equals(["1", "+", "2", "-", "3"]));
});

test('rpn#revert should return "1 * 2 / 3" if the value "1 2 * 3 /" is passed', t => {
    t.true(rpn.revert(["1", "2", "*", "3", "/"]).equals(["1", "*", "2", "/", "3"]));
});

test('rpn#revert should return "1 + 2 - 3 + 4" if the value "1 2 + 3 - 4 +" is passed', t => {
    t.true(rpn.revert(["1", "2", "+", "3", "-", "4", "+"]).equals(["1", "+", "2", "-", "3", "+", "4"]));
});

test('rpn#revert should return "1 * 2 / 3 * 4" if the value "1 2 * 3 / 4 *" is passed', t => {
    t.true(rpn.revert(["1", "2", "*", "3", "/", "4", "*"]).equals(["1", "*", "2", "/", "3", "*", "4"]));
});

test('rpn#revert should return "1 + 2 * 3 / 4" if the value "1 2 3 * 4 / +" is passed', t => {
    t.true(rpn.revert(["1", "2", "3", "*", "4", "/", "+"]).equals(["1", "+", "2", "*", "3", "/", "4"]));
});

test('rpn#revert should return "1 / 2 * 3 - 4" if the value "1 2 / 3 * 4 -" is passed', t => {
    t.true(rpn.revert(["1", "2", "/", "3", "*", "4", "-"]).equals(["1", "/", "2", "*", "3", "-", "4"]));
});

test('rpn#revert should return "1 + 2 - 3 * 4" if the value "1 2 + 3 4 * -" is passed', t => {
    t.true(rpn.revert(["1", "2", "+", "3", "4", "*", "-"]).equals(["1", "+", "2", "-", "3", "*", "4"]));
});

test('rpn#revert should return "1 + 2 / 3 - 4" if the value "1 2 3 / + 4 -" is passed', t => {
    t.true(rpn.revert(["1", "2", "3", "/", "+", "4", "-"]).equals(["1", "+", "2", "/", "3", "-", "4"]));
});

test('rpn#revert should return "1 * 2 + 3 - 4" if the value "1 2 * 3 + 4 -" is passed', t => {
    t.true(rpn.revert(["1", "2", "*", "3", "+", "4", "-"]).equals(["1", "*", "2", "+", "3", "-", "4"]));
});


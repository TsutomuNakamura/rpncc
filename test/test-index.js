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


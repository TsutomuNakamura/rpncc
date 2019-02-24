import test from 'ava';
import sinon from 'sinon';
import rewire from 'rewire';

import './lib/load_prototypes';

var ccc = 0;

test.beforeEach.cb(t => {
    t.context.stub = {};
    t.context.stub.chance = {
        bool: () => { return false; },
        name: () => { return "some person"; },
        integer: () => { return 0; },
        shuffle: sinon.spy()
    };
    t.context.MockRpn = rewire('../index');
    t.context.MockRpn.__set__('chance', t.context.stub.chance);
    setTimeout(t.end);
});

test.beforeEach.cb(t => {
    setTimeout(t.end);
});

test('rpn#convert_by_someone should return the almost correct answer', async t => {
    const stub    = t.context.stub,
          MockRpn = t.context.MockRpn;

    const rpn = new MockRpn();

    t.plan(4);
    await rpn.convert_by_someone(["1", "*", "2", "+", "3", "-", "4"]).then(result => {
        t.true(Array.isArray(result.answer));
        t.is(result.representative, "some person");
        t.is(result.error, undefined);
        t.true(result.answer.equals(["1", "2", "*", "3", "+", "4", "-"]));
    });
});

test('rpn#convert_by_someone sometimes replies no answer because the representative is absence', async t => {
    const stub    = t.context.stub,
          MockRpn = t.context.MockRpn;

    stub.chance.bool = () => { return true; };

    const rpn = new MockRpn();

    t.plan(2);
    await rpn.convert_by_someone(["1", "+", "2"]).then(result => {
        t.is(result.error.message, 'Sorry, some person is absent right now.');
        t.is(result.answer, undefined);
    });
});

test('rpn#convert_by_someone sometimes replies wrong answer', async t => {
    const stub    = t.context.stub,
          MockRpn = t.context.MockRpn;

    var count = 0;
    stub.chance.bool = () => { return !(count++ === 0); };

    const rpn = new MockRpn();

    t.plan(3);
    await rpn.convert_by_someone(["1", "+", "2"]).then(result => {
        t.true(stub.chance.shuffle.calledOnce);
        t.true(Array.isArray(stub.chance.shuffle.args[0][0]));  // Check the first argument at called first time
        t.true(stub.chance.shuffle.args[0][0].equals(["1", "+", "2"]));
    });
});


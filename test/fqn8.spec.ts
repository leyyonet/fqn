// noinspection JSUnusedLocalSymbols,JSUnusedGlobalSymbols

beforeAll(() => {
    process.env.IS_TESTING = '1';
    return null;
});

import {_fqn} from "./aaa.fqn";
import {Fqn8Class1} from "../src/samples/fqn8-getter-setter";
import {strict as assert} from "assert";
import {fqnPool} from "../src";

describe('FQN#8 -Getter/Setter', () => {
    _fqn('Fqn8Class1', Fqn8Class1, 'fqn8.Fqn8Class1', 'class', 'class.root');
    it('getter #static', () => {
        assert.notEqual(fqnPool.name(Fqn8Class1.field2), 'fqn8.Fqn8Class1.field2');
    });
    const ins = new Fqn8Class1();
    _fqn('ins', ins, 'fqn8.Fqn8Class1', 'class', 'class.root');
    it('getter #instance', () => {
        assert.notEqual(fqnPool.name(ins.field1), 'fqn8.Fqn8Class1.field1');
    });
});

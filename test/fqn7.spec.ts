// noinspection JSUnusedLocalSymbols,JSUnusedGlobalSymbols

beforeAll(() => {
    process.env.IS_TESTING = '1';
    return null;
});

import {_fqn} from "./aaa.fqn";
import {Fqn7Class1, fqn7Fnc1, fqn7Fnc2, ins2, ins3} from "../src/samples/fqn7-file";

describe('FQN#7 -File', () => {
    _fqn('fqn7Fnc1', fqn7Fnc1, 'fqn7.fqn7Fnc1', 'function', 'function.anonymous');
    _fqn('fqn7Fnc2', fqn7Fnc2, 'fqn7.fqn7Fnc2', 'function', 'function.regular');
    _fqn('ins3', ins3, 'fqn7.fqn7Fnc2', 'function', 'function.regular');

    _fqn('Class1', Fqn7Class1, 'fqn7.Fqn7Class1', 'class', 'class.root')
    _fqn('Class1.static1', Fqn7Class1.static1, 'fqn7.Fqn7Class1.static1', 'method', 'method.static');
    _fqn('Class1 #instance', ins2, 'fqn7.Fqn7Class1', 'class', 'class.root')
    _fqn('Class1.instance1', ins2.instance1, 'fqn7.Fqn7Class1.instance1', 'method', 'method.instance');
});

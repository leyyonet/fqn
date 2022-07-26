// noinspection JSUnusedLocalSymbols,JSUnusedGlobalSymbols

beforeAll(() => {
    process.env.IS_TESTING = '1';
    return null;
});

import {_fqn} from "./aaa.fqn";
import {fqn4Func1, fqn4Func2, fqn4Func3, fqn4Func4, Fqn4Func4} from "../src/samples/fqn4-function";

describe('FQN#4 #function', () => {
    _fqn('fqn4Func1 #regular', fqn4Func1, 'fqn4.fqn4Func1', 'function', 'function.regular')
    _fqn('fqn4Func2 #arrow', fqn4Func2, 'fqn4.fqn4Func2', 'function', 'function.anonymous')
    _fqn('fqn4Func3 $generator', fqn4Func3, 'fqn4.fqn4Func3', 'function', 'function.generator')
    _fqn('Fqn4Func4 #constructor', Fqn4Func4, 'fqn4.Fqn4Func4', 'function', 'function.regular')
    _fqn('fqn4Func4 #instance', fqn4Func4, 'fqn4.Fqn4Func4', 'function', 'function.regular')
});
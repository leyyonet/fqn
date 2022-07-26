// noinspection JSUnusedLocalSymbols,JSUnusedGlobalSymbols

beforeAll(() => {
    process.env.IS_TESTING = '1';
    return null;
});


import {_fqn} from "./aaa.fqn";
import {Fqn3Enum1} from "../src/samples/fqn3-enum";

describe('FQN#3 -enum', () => {
    _fqn('Fqn3Enum1', Fqn3Enum1, 'fqn3.Fqn3Enum1', 'enumeration', 'enumeration.defined')
});
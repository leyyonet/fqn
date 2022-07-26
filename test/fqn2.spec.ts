// noinspection JSUnusedLocalSymbols,JSUnusedGlobalSymbols

beforeAll(() => {
    process.env.IS_TESTING = '1';
    return null;
});


import {Fqn2Class1, Fqn2Class2} from "../src/samples/fqn2-decorator";
import {_fqn} from "./aaa.fqn";
import {fqnPool} from "../src";

describe('FQN#2 -decorator', () => {
    _fqn('Fqn2Class1', Fqn2Class1, 'fqn2.Fqn2Class1', 'class', 'class.root')
    _fqn('Fqn2Class1.static1', Fqn2Class1.static1, 'fqn2.Fqn2Class1.static1', 'method', 'method.static');
    _fqn('Fqn2Class1.static2', Fqn2Class1.static2, 'fqn2.Fqn2Class1.static2', 'method', 'method.static');
    const fqn2Class1 = new Fqn2Class1();
    _fqn('Fqn2Class1 #instance', fqn2Class1, 'fqn2.Fqn2Class1', 'class', 'class.root')
    _fqn('Fqn2Class1.instance1', fqn2Class1.instance1, 'fqn2.Fqn2Class1.instance1', 'method', 'method.instance');
    _fqn('Fqn2Class1.instance2', fqn2Class1.instance2, 'fqn2.Fqn2Class1.instance2', 'method', 'method.instance');

    _fqn('Fqn2Class2 #inherited', Fqn2Class2, 'fqn2.Fqn2Class2', 'class', 'class.inherited')
    _fqn('Fqn2Class2.static1 #inherited', Fqn2Class2.static1, fqnPool.name(Fqn2Class1.static1), 'method', 'method.static');
    _fqn('Fqn2Class2.static2 #overrridden', Fqn2Class2.static2, 'fqn2.Fqn2Class2.static2', 'method', 'method.static');
    _fqn('Fqn2Class2.static2', Fqn2Class2.static3, 'fqn2.Fqn2Class2.static3', 'method', 'method.static');
    const fqn2Class2 = new Fqn2Class2();
    _fqn('Fqn2Class2 #instance #inherited', fqn2Class2, 'fqn2.Fqn2Class2', 'class', 'class.inherited')
    _fqn('Fqn2Class2.instance1 #inherited', fqn2Class2.instance1, fqnPool.name(fqn2Class1.instance1), 'method', 'method.instance');
    _fqn('Fqn2Class2.instance2 #overrridden', fqn2Class2.instance2, 'fqn2.Fqn2Class2.instance2', 'method', 'method.instance');
    _fqn('Fqn2Class2.instance3', fqn2Class2.instance3, 'fqn2.Fqn2Class2.instance3', 'method', 'method.instance');
});
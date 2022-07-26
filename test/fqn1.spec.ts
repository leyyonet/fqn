// noinspection JSUnusedLocalSymbols,JSUnusedGlobalSymbols

beforeAll(() => {
    process.env.IS_TESTING = '1';
    return null;
});
import {fqnPool} from "../src";
import {Fqn1Class1, Fqn1Class2} from "../src/samples/fqn1-class";
import {_fqn} from "./aaa.fqn";

describe('FQN#1 -class', () => {
    _fqn('Fqn1Class1', Fqn1Class1, 'fqn1.Fqn1Class1', 'class', 'class.root')
    _fqn('Fqn1Class1.static1', Fqn1Class1.static1, 'fqn1.Fqn1Class1.static1', 'method', 'method.static');
    _fqn('Fqn1Class1.static2', Fqn1Class1.static2, 'fqn1.Fqn1Class1.static2', 'method', 'method.static');
    const fqn1Class1 = new Fqn1Class1();
    _fqn('Fqn1Class1 #instance', fqn1Class1, 'fqn1.Fqn1Class1', 'class', 'class.root')
    _fqn('Fqn1Class1.instance1', fqn1Class1.instance1, 'fqn1.Fqn1Class1.instance1', 'method', 'method.instance');
    _fqn('Fqn1Class1.instance2', fqn1Class1.instance2, 'fqn1.Fqn1Class1.instance2', 'method', 'method.instance');

    _fqn('Fqn1Class2 #inherited', Fqn1Class2, 'fqn1.Fqn1Class2', 'class', 'class.inherited')
    _fqn('Fqn1Class2.static1 #inherited', Fqn1Class2.static1, fqnPool.name(Fqn1Class1.static1), 'method', 'method.static');
    _fqn('Fqn1Class2.static2 #overrridden', Fqn1Class2.static2, 'fqn1.Fqn1Class2.static2', 'method', 'method.static');
    _fqn('Fqn1Class2.static2', Fqn1Class2.static3, 'fqn1.Fqn1Class2.static3', 'method', 'method.static');
    const fqn1Class2 = new Fqn1Class2();
    _fqn('Fqn1Class2 #instance #inherited', fqn1Class2, 'fqn1.Fqn1Class2', 'class', 'class.inherited')
    _fqn('Fqn1Class2.instance1 #inherited', fqn1Class2.instance1, fqnPool.name(fqn1Class1.instance1), 'method', 'method.instance');
    _fqn('Fqn1Class2.instance2 #overrridden', fqn1Class2.instance2, 'fqn1.Fqn1Class2.instance2', 'method', 'method.instance');
    _fqn('Fqn1Class2.instance3', fqn1Class2.instance3, 'fqn1.Fqn1Class2.instance3', 'method', 'method.instance');
});

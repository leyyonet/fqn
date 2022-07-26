// noinspection JSUnusedLocalSymbols,JSUnusedGlobalSymbols

beforeAll(() => {
    process.env.IS_TESTING = '1';
    return null;
});

import {_fqn} from "./aaa.fqn";
import {mdl1} from "../src/samples/fqn5-module";
import Class1 = mdl1.Class1;
import Class2 = mdl1.Class2;
import Class0 = mdl1.Class0;
import Class3 = mdl1.Class3;
import {fqnPool} from "../src";

describe('FQN#5 -module', () => {
    _fqn('mdl1', mdl1, 'fqn5.mdl1', 'module', 'module')
    _fqn('Class0', Class0, 'fqn5.mdl1.Class0', 'class', 'class.root')
    _fqn('Class1', Class1, 'fqn5.mdl1.Class1', 'class', 'class.root')
    _fqn('Class1.static1', Class1.static1, 'fqn5.mdl1.Class1.static1', 'method', 'method.static');
    _fqn('Class1.static2', Class1.static2, 'fqn5.mdl1.Class1.static2', 'method', 'method.static');
    const class1 = new Class1();
    _fqn('Class1 #instance', class1, 'fqn5.mdl1.Class1', 'class', 'class.root')
    _fqn('Class1.instance1', class1.instance1, 'fqn5.mdl1.Class1.instance1', 'method', 'method.instance');
    _fqn('Class1.instance2', class1.instance2, 'fqn5.mdl1.Class1.instance2', 'method', 'method.instance');

    _fqn('Class2 #inherited', Class2, 'fqn5.mdl1.Class2', 'class', 'class.inherited')
    _fqn('Class2.static1 #inherited', Class2.static1, fqnPool.name(Class1.static1), 'method', 'method.static');
    _fqn('Class2.static2 #overrridden', Class2.static2, 'fqn5.mdl1.Class2.static2', 'method', 'method.static');
    _fqn('Class2.static2', Class2.static3, 'fqn5.mdl1.Class2.static3', 'method', 'method.static');
    const class2 = new Class2();
    _fqn('Class2 #instance #inherited', class2, 'fqn5.mdl1.Class2', 'class', 'class.inherited')
    _fqn('Class2.instance1 #inherited', class2.instance1, fqnPool.name(class1.instance1), 'method', 'method.instance');
    _fqn('Class2.instance2 #overrridden', class2.instance2, 'fqn5.mdl1.Class2.instance2', 'method', 'method.instance');
    _fqn('Class2.instance3', class2.instance3, 'fqn5.mdl1.Class2.instance3', 'method', 'method.instance');


    _fqn('Class3 #inherited', Class3, 'fqn5.mdl1.Class3', 'class', 'class.inherited')
    _fqn('Class3.static1 #inherited', Class3.static1, fqnPool.name(Class1.static1), 'method', 'method.static');
    _fqn('Class3.static2 #inherited', Class3.static2, fqnPool.name(Class2.static2), 'method', 'method.static');
    _fqn('Class3.static2 #inherited', Class3.static3, fqnPool.name(Class2.static3), 'method', 'method.static');

    const class3 = new Class3();
    _fqn('Class3 #instance #inherited', class3, 'fqn5.mdl1.Class3', 'class', 'class.inherited')
    _fqn('Class3.instance1 #inherited', class3.instance1, fqnPool.name(class1.instance1), 'method', 'method.instance');
    _fqn('Class3.instance2 #inherited', class3.instance2, fqnPool.name(class2.instance2), 'method', 'method.instance');
    _fqn('Class3.instance3 #inherited', class3.instance3, fqnPool.name(class2.instance3), 'method', 'method.instance');
});

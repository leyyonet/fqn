// noinspection JSUnusedLocalSymbols,JSUnusedGlobalSymbols

beforeAll(() => {
    process.env.IS_TESTING = '1';
    return null;
});

import {_fqn} from "./aaa.fqn";
import {ns1} from "../src/samples/fqn6-ns";
import Class0 = ns1.Class0;
import Class1 = ns1.Class1;
import Class4 = ns1.Class4;
import Enum1 = ns1.Enum1;
import funcRegular = ns1.funcRegular;
import funcAnonymous = ns1.funcAnonymous;
import Class2 = ns1.sub.Class2;
import sub = ns1.sub;
import Class3 = ns1.sub.Class3;
import Class5 = ns1.sub.Class5;
import funcGenerator = ns1.sub.funcGenerator;
import {fqnPool} from "../src";

describe('FQN#6 -Namespace', () => {
    _fqn('ns1', ns1, 'fqn6.ns1', 'namespace', 'namespace')

    _fqn('Class0', Class0, 'fqn6.ns1.Class0', 'class', 'class.root')

    _fqn('Class1', Class1, 'fqn6.ns1.Class1', 'class', 'class.root')
    _fqn('Class1.static1', Class1.static1, 'fqn6.ns1.Class1.static1', 'method', 'method.static');
    _fqn('Class1.static2', Class1.static2, 'fqn6.ns1.Class1.static2', 'method', 'method.static');
    const class1 = new Class1();
    _fqn('Class1 #instance', class1, 'fqn6.ns1.Class1', 'class', 'class.root')
    _fqn('Class1.instance1', class1.instance1, 'fqn6.ns1.Class1.instance1', 'method', 'method.instance');
    _fqn('Class1.instance2', class1.instance2, 'fqn6.ns1.Class1.instance2', 'method', 'method.instance');

    _fqn('Class4', Class4, 'fqn6.ns1.Class4', 'class', 'class.root')
    _fqn('Enum1', Enum1, 'fqn6.ns1.Enum1', 'enumeration', 'enumeration.possible')
    _fqn('funcRegular', funcRegular, 'fqn6.ns1.funcRegular', 'function', 'function.regular')
    _fqn('funcAnonymous', funcAnonymous, 'fqn6.ns1.funcAnonymous', 'function', 'function.anonymous')

    _fqn('ns1.sub', sub, 'fqn6.ns1.sub', 'namespace', 'namespace')

    _fqn('Class2 #inherited', Class2, 'fqn6.ns1.sub.Class2', 'class', 'class.inherited')
    _fqn('Class2.static1 #inherited', Class2.static1, fqnPool.name(Class1.static1), 'method', 'method.static');
    _fqn('Class2.static2 #overrridden', Class2.static2, 'fqn6.ns1.sub.Class2.static2', 'method', 'method.static');
    _fqn('Class2.static2', Class2.static3, 'fqn6.ns1.sub.Class2.static3', 'method', 'method.static');
    const class2 = new Class2();
    _fqn('Class2 #instance #inherited', class2, 'fqn6.ns1.sub.Class2', 'class', 'class.inherited')
    _fqn('Class2.instance1 #inherited', class2.instance1, fqnPool.name(class1.instance1), 'method', 'method.instance');
    _fqn('Class2.instance2 #overrridden', class2.instance2, 'fqn6.ns1.sub.Class2.instance2', 'method', 'method.instance');
    _fqn('Class2.instance3', class2.instance3, 'fqn6.ns1.sub.Class2.instance3', 'method', 'method.instance');


    _fqn('Class3 #inherited', Class3, 'fqn6.ns1.sub.Class3', 'class', 'class.inherited')
    _fqn('Class3.static1 #inherited', Class3.static1, fqnPool.name(Class1.static1), 'method', 'method.static');
    _fqn('Class3.static2 #inherited', Class3.static2, fqnPool.name(Class2.static2), 'method', 'method.static');
    _fqn('Class3.static2 #inherited', Class3.static3, fqnPool.name(Class2.static3), 'method', 'method.static');

    const class3 = new Class3();
    _fqn('Class3 #instance #inherited', class3, 'fqn6.ns1.sub.Class3', 'class', 'class.inherited')
    _fqn('Class3.instance1 #inherited', class3.instance1, fqnPool.name(class1.instance1), 'method', 'method.instance');
    _fqn('Class3.instance2 #inherited', class3.instance2, fqnPool.name(class2.instance2), 'method', 'method.instance');
    _fqn('Class3.instance3 #inherited', class3.instance3, fqnPool.name(class2.instance3), 'method', 'method.instance');

    _fqn('Class5 #inherited', Class5, 'fqn6.ns1.sub.Class5', 'class', 'class.anonymous')

    _fqn('funcGenerator', funcGenerator, 'fqn6.ns1.sub.funcGenerator', 'function', 'function.generator')

});

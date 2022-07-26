import {emptyFn, printDetailed} from "@leyyo/core";
import {fqnPool} from "../";

export function fqn4Func1() {emptyFn();}
fqnPool.func(fqn4Func1, 'fqn4');

export const fqn4Func2 = () => {emptyFn();}
fqnPool.func(fqn4Func2, 'fqn4');

export function *fqn4Func3(i) {
    yield i;
    yield i + 10;
}
fqnPool.func(fqn4Func3, 'fqn4');

export function Fqn4Func4() {
    this.name = 'foo bar';
}
fqnPool.func(Fqn4Func4, 'fqn4');
export const fqn4Func4 = new Fqn4Func4();

export const sampleFqn4 = () => {
    printDetailed('fqn4-function', fqnPool.reports(fqn4Func1, fqn4Func2, fqn4Func3, Fqn4Func4, fqn4Func4));
}

// noinspection JSUnusedGlobalSymbols

import {fqnPool} from "../";
import {printDetailed} from "@leyyo/core";


export const fqn7Fnc1 = (): void => {return}
export function fqn7Fnc2(): void {return;}
export class Fqn7Class1 {
    static static1 (): void {return;}
    instance1 (): void {return;}
}
export const ins2 = new Fqn7Class1();
export const ins3 = new fqn7Fnc2();
fqnPool.file(this, 'fqn7');

export const sampleFqn7 = () => {
    printDetailed('fqn7-file', fqnPool.report(this));
}
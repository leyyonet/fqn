// noinspection JSUnusedGlobalSymbols

import {emptyFn, printDetailed} from "@leyyo/core";
import {fqnPool} from "../";

export module mdl1 {
    export abstract class Class0 {}
    export class Class1 {
        static static1 (): void {return;}
        static static2 (): void {return;}
        instance1 (): void {return;}
        instance2 (): void {return;}
    }
    export class Class2 extends Class1 {
        static static2 (): void {return;}
        static static3 (): void {return;}
        instance2 (): void {return;}
        instance3 (): void {return;}
    }
    export class Class3 extends Class2 {
    }
    export class Class4 {
    }
    export enum Enum1 {
        KEY1 = 'key1'
    }
    export const Class5 = class {
        constructor() {console.log(1);}
    };
    export function funcRegular(): void {return;}
    export const funcAnonymous = () => {return;}
    export function* funcGenerator(i) {
        yield i;
        yield i + 10;
    }
    export const class2 = new Class2();
    export const funcInstance = new funcRegular();

    export const obj1 = {
        fnc1() {
            emptyFn();
        },
        property: 5,
        arr: [],
    }
    export const obj2 = {
        key1: 1,
        key2: 2,
    }
    export const arr1 = [1,2,3];
    export const map1 = new Map();
    export const set1 = new Set();
}
fqnPool.module({mdl1}, 'fqn5');

export const sampleFqn5 = () => {
    printDetailed('fqn5-module', fqnPool.report(mdl1));
}
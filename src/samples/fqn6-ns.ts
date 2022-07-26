// noinspection JSUnusedGlobalSymbols

import {fqnPool} from "../";
import {printDetailed} from "@leyyo/core";

export namespace ns1 {
    export abstract class Class0 {}
    export class Class1 {
        static static1 (): void {return;}
        static static2 (): void {return;}
        instance1 (): void {return;}
        instance2 (): void {return;}
    }
    export class Class4 {
    }
    export enum Enum1 {
        KEY1 = 'key1'
    }
    export function funcRegular(): void {return;}
    export const funcAnonymous = () => {return;}
    export namespace sub {
        export class Class2 extends Class1 {
            static static2 (): void {return;}
            static static3 (): void {return;}
            instance2 (): void {return;}
            instance3 (): void {return;}
        }
        export class Class3 extends Class2 {
        }
        export const Class5 = class {
            constructor() {console.log(1);}
        };
        export function* funcGenerator(i) {
            yield i;
            yield i + 10;
        }
    }
    fqnPool.namespace({sub}, 'fqn6', 'ns1');
}
fqnPool.namespace({ns1}, 'fqn6');

export const sampleFqn6 = () => {
    printDetailed('fqn6-namespace', fqnPool.report(ns1));
}
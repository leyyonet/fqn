// noinspection JSUnusedGlobalSymbols

import {Fqn, fqnPool} from "../";
import {printDetailed} from "@leyyo/core";

@Fqn('fqn8')
export class Fqn8Class1 {
    protected _field1: string;
    protected static _field2: string;


    get field1(): string {
        return this._field1;
    }

    set field1(value: string) {
        this._field1 = value;
    }

    static get field2(): string {
        return this._field2;
    }

    static set field2(value: string) {
        this._field2 = value;
    }
}

@Fqn('fqn8')
export class Fqn8Class2 extends Fqn8Class1 {
    protected _field2: string;
    protected static _field3: string;


    get field2(): string {
        return this._field2;
    }

    set field2(value: string) {
        this._field2 = value;
    }

    static get field3(): string {
        return this._field3;
    }

    static set field3(value: string) {
        this._field3 = value;
    }
}
export const sampleFqn8 = () => {
    printDetailed('fqn8-getter-setter', fqnPool.reports(Fqn8Class1, new Fqn8Class1(), Fqn8Class2, new Fqn8Class2()));
}
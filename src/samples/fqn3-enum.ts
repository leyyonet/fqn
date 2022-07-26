import {printDetailed} from "@leyyo/core";
import {fqnPool} from "../";

export enum Fqn3Enum1 {
    KEY1 = 'key-1', KEY2 = 'key-2', KEY3 = 'key=3'
}
fqnPool.enumeration('Fqn3Enum1', Fqn3Enum1, 'fqn3');

export const sampleFqn3 = () => {
    printDetailed('fqn3-enum', fqnPool.report(Fqn3Enum1));
}
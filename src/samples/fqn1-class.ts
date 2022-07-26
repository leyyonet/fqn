import {printDetailed} from "@leyyo/core";
import {fqnPool} from "../";

export class Fqn1Class1 {
    static static1 (): void {return;}
    static static2 (): void {return;}
    instance1 (): void {return;}
    instance2 (): void {return;}
}
fqnPool.clazz(Fqn1Class1, 'fqn1');

export class Fqn1Class2 extends Fqn1Class1 {
    static static2 (): void {return;}
    static static3 (): void {return;}
    instance2 (): void {return;}
    instance3 (): void {return;}
}
fqnPool.clazz(Fqn1Class2, 'fqn1');
export const sampleFqn1 = () => {
    printDetailed('fqn1-class', fqnPool.reports(Fqn1Class1, new Fqn1Class1(), Fqn1Class2));
}
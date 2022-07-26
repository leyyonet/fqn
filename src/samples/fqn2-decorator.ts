import {printDetailed} from "@leyyo/core";
import {fqnPool, Fqn} from "../";
import {Fqn1Class1, Fqn1Class2} from "./fqn1-class";

@Fqn('com.erdi-tech')
export class Fqn2Class1 {
    static static1 (): void {return;} //
    static static2 (): void {return;}
    instance1 (): void {return;}
    instance2 (): void {return;}
}

@Fqn('fqn2')
export class Fqn2Class2 extends Fqn2Class1 {
    static static2 (): void {return;}
    static static3 (): void {return;}
    instance2 (): void {return;}
    instance3 (): void {return;}
}

export const sampleFqn2 = () => {
    printDetailed('fqn2-decorator', fqnPool.reports(Fqn1Class1, new Fqn1Class1(), Fqn1Class2));
}
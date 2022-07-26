import {ClassLike, leyyo} from "@leyyo/core";
import {FqnPoolLike} from "./index-types";

let lyyFqn: FqnPoolLike;
export function lyyFqnSet(ins: FqnPoolLike): void {
    lyyFqn = ins;
}
/**
 * Decorates class with optional prefixes
 *
 * Class fqn will be `{prefixes}.{class}`
 */
export function Fqn(...prefixes: Array<string>): ClassDecorator {
    return (target: unknown) => {
        lyyFqn.clazz(target as ClassLike, ...prefixes);
        leyyo.decoPool.add(Fqn, {target, options: {clazz: true}, value: {prefixes}});
    };
}
export function Bind(): ClassDecorator {
    return (target: unknown) => {
        lyyFqn.refresh(target as ClassLike, true);
        leyyo.decoPool.add(Bind, {target, options: {clazz: true}, value: {}});
    };
}

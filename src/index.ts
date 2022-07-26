import {leyyo} from "@leyyo/core";
import {Bind, Fqn, lyyFqnSet} from "./index-annotations";
import {fqnPool, FqnPool} from "./fqn-pool";
import {FQN_NAME} from "./internal-component";

lyyFqnSet(fqnPool);
leyyo.fqnPool.set(fqnPool);
fqnPool.clazz(FqnPool, ...FQN_NAME);
fqnPool.func(Fqn, ...FQN_NAME);
fqnPool.func(Bind, ...FQN_NAME);
const fqn = fqnPool;

export {fqn, fqnPool, Fqn, Bind};
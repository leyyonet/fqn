import {LEYYO_KEY, LEYYO_NAME} from "@leyyo/core";

export const BASE_NAME = 'fqn';
export const COMPONENT_NAME = `@${LEYYO_NAME}/${BASE_NAME}`;
export const FQN_NAME = [LEYYO_NAME, BASE_NAME];
export const FQN_KEY = Symbol.for(`${LEYYO_KEY}fqn/k`);
export const FQN_HOOK = Symbol.for(`${LEYYO_KEY}fqn/h`);
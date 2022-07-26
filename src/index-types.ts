import {ClassLike, FuncLike, ObjectLike, RecLike} from "@leyyo/core";

export type FqnValueType = 'class'|'function'|'method'|'enumeration'|'namespace'|'module'|'file'|'object';
export type FqnValues = [string, FqnValueType, string];
export interface FqnSignInner {
    footprint: string;
    name?: string;
    fqn?: string;
    type?: string;
}
export interface FqnSign extends FqnSignInner {
    parent?: FqnSignInner;
    proto?: FqnSignInner;
    constructor?: FqnSignInner;
}
export interface FqnSigned {
    name: string;
    type: FqnValueType;
    footprint: string;
}
export interface FqnSignedTree extends FqnSigned {
    children?: Record<string, FqnSignedTree>;
}

export interface FqnPoolLike {
    // region sign
    get key(): Symbol;
    signed(value: unknown, nullable?: boolean): FqnSigned;
    is(value: unknown): boolean;
    onSigned(holder: unknown, lambda: FuncLike): void;
    name(value: unknown): string;
    type(value: unknown): FqnValueType;
    footprint(value: unknown): string;
    // endregion sign
    // region dimension
    refresh(target: ObjectLike|FuncLike, forced?: boolean): void;
    clazz(clazz: ClassLike, ...prefixes: Array<string>): void;
    func(fn: FuncLike, ...prefixes: Array<string>): void;
    enumeration(name: string, value: ObjectLike, ...prefixes: Array<string>): void;
    namespace(ns: RecLike, ...prefixes: Array<string>): void;
    module(ins: RecLike, ...prefixes: Array<string>): void;
    object(name: string, value: ObjectLike, ...prefixes: Array<string>): void;
    file(ins: unknown, ...prefixes: Array<string>): void;
    reports(...objects: Array<unknown>): Array<FqnSignedTree>;
    report(obj: unknown): FqnSignedTree;
    /**
     * @deprecated
     * */
    patch(obj: unknown, ...prefixes: Array<string>): void;
    // endregion dimension
}
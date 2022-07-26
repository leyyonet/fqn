import {ClassLike, DeveloperException, FuncLike, leyyo, ObjectLike, ProcessorKey, RecLike} from "@leyyo/core";
import {FqnPoolLike, FqnSign, FqnSigned, FqnSignedTree, FqnValues, FqnValueType} from "./index-types";
import {COMPONENT_NAME, FQN_HOOK, FQN_KEY} from "./internal-component";

export class FqnPool implements FqnPoolLike {
    // region property
    protected _set: WeakSet<ClassLike>;
    protected readonly LOG = leyyo.logger.assign(FqnPool);
    // endregion property
    // region constructor
    constructor() {
        this._set = new WeakSet<ClassLike>();
        leyyo.component.add(COMPONENT_NAME);
        leyyo.processor.add(ProcessorKey.END, () => this._set = null);
    }
    // endregion constructor
    // region private
    protected _buildSign(name: string, type: FqnValueType, footprint: FqnSign|string): FqnSigned {
        name = name ?? null;
        type = type ?? null;
        footprint = footprint ?? null;
        const sign = {name, type, footprint, count: 1} as FqnSigned;
        if (sign.footprint && typeof sign.footprint !== 'string') {
            sign.footprint = (footprint as FqnSign).footprint ?? null;
        }
        return sign;
    }
    protected _runHooks(holder: unknown): void {
        if (leyyo.is.empty(holder) || !['object', 'function'].includes(typeof holder)) {
            return;
        }
        const sign = this.signed(holder, false);
        const value: Array<FuncLike> = [];
        let exists = false;
        try {
            const desc = Object.getOwnPropertyDescriptor(holder, FQN_HOOK);
            if (desc) {
                exists = true;
                if (leyyo.is.array(desc.value, true)) {
                    value.push(...desc.value);
                }
            }
        } catch (e) {
            this.LOG.native(e, '_runHooks-fetch', sign);
        }
        if (exists) {
            value.forEach(lambda => {
                try {
                    lambda();
                } catch (e) {
                    this.LOG.native(e, '_runHooks-exec', sign);
                }
            });
            delete holder[FQN_HOOK];
        }
    }
    protected _setDirect(holder: unknown, sign: FqnSigned): boolean {
        try {
            const desc = this._desc(holder);
            if (desc) {
                desc[0] = sign.name;
                desc[1] = sign.type;
                desc[2] = sign.footprint;
                return true;
            }
            Object.defineProperty(holder, FQN_KEY, {value: [sign.name, sign.type, sign.footprint], configurable: false, writable: false, enumerable: false});
        } catch (e) {
            this.LOG.native(e, 'signed', sign);
            return false;
        }
        // this.LOG.debug(isBind ? 'bound' : 'signed', sign);
        return true;
    }
    protected _readName(prefixes: Array<string>): Array<string> {
        return prefixes.map((value, index) => leyyo.primitive.text(value, {field: `fqn.prefix#${index}`})).filter(value => !!value);
    }
    protected _buildName(names: Array<string>): string {
        return names.length > 0 ? names.join('.') : null
    }
    protected _isTarget(name: string, target: FuncLike|ObjectLike): boolean {
        return target && ['function', 'object'].includes(typeof target) && !leyyo.system.isSysClass(name);
    }
    protected _buildFootprint(item: unknown): string {
        if (!item) {return null;}
        let type = (typeof item) as string;
        if (!['function', 'object'].includes(type)) {return type;}
        const foot = Object.prototype.toString.call(item) as string;
        if (foot.startsWith('[function')) {
            type = foot.substring(foot.indexOf(' ') + 1, foot.indexOf(']'));
            type = 'function.' + type[0].toLowerCase() + type.substring(1);
        }
        if (foot.startsWith('[object')) {
            type = foot.substring(foot.indexOf(' ') + 1, foot.indexOf(']'));
            type = 'object.' + type[0].toLowerCase() + type.substring(1);
        }
        if (foot === '[object GeneratorFunction]') {
            return 'function.generator';
        }
        let str = '';
        try {
            str = item + '';
        } catch (e) {
            return type;
        }
        if (str.startsWith('class')) {
            const className = str.substring(5, str.indexOf('{')).trim();
            if (className === '') {
                return 'class.anonymous';
            } else if (className.includes('extends ')) {
                return `class.inherited`;
            }
            return 'class.root';
        }
        else if (str.startsWith('function')) {
            return 'function.regular';
        }
        else if (str.startsWith('(')) {
            return 'function.anonymous';
        }
        return type;
    }
    protected _prepareSign(item: unknown, detailed: boolean): FqnSign {
        if (!item) {return null;}
        const obj = {
            name: (item as FuncLike).name ?? null,
            fqn: null,
            type: null,
            footprint: null,
        } as FqnSign;
        const desc = this._desc(item);
        if (desc) {
            obj.fqn = obj[0];
            obj.type = obj[1];
            obj.footprint = obj[2];
        }
        for (const [k, v] of Object.entries(obj)) {
            if (!v) {
                delete obj[k];
            }
        }
        if (!obj.footprint) {
            obj.footprint = this._buildFootprint(item);
        }
        if (detailed) {
            const details = {
                parent: Object.getPrototypeOf(item),
                proto: (item as FuncLike)?.prototype,
                constructor: (item as FuncLike)?.constructor,
            }
            for (const [k, v] of Object.entries(details)) {
                const sign = this._prepareSign(v, false);
                if (sign) {
                    obj[k] = sign;
                }
            }
        }
        return obj;
    }
    protected _possibleEnum(name: string, obj: unknown, ...names: Array<string>): FqnSigned|boolean {
        name = leyyo.primitive.text(name, {silent: true, field: 'possibleEnum'});
        if (!name || !leyyo.is.object(obj, true)) {
            return false;
        }
        const preSign = this._prepareSign(obj, false);
        if (preSign.fqn) {
            return true;
        }
        if (obj.constructor?.name !== 'Object') {
            // constructor should be object
            return false;
        }
        for (const key of Object.keys(obj)) {
            const desc = Object.getOwnPropertyDescriptor(obj, key);
            if (desc) {
                if (typeof desc.get === 'function') {
                    // property has getter
                    return false;
                }
                if (typeof desc.set === 'function') {
                    // property has setter
                    return false;
                }
                if (!['string', 'number'].includes(typeof desc.value)) {
                    // property type is not string or number
                    return false;
                }
            }
        }
        names = this._readName(names);
        names.push(name);
        return this._buildSign(this._buildName(names), 'enumeration', 'enumeration.possible');
    }
    protected _possibleArray(name: string, obj: unknown, ...names: Array<string>): FqnSigned|boolean {
        name = leyyo.primitive.text(name, {silent: true, field: 'possibleArray'});
        if (!name) {
            return false;
        }
        const preSign = this._prepareSign(obj, false);
        if (preSign.fqn) {
            return true;
        }
        if (!obj.constructor?.name) {
            return false;
        }
        names = this._readName(names);
        names.push(name);
        return this._buildSign(this._buildName(names), 'object', 'object.' + obj.constructor.name);
    }
    protected _renameAnonymous(name: string, fn: unknown, sign: FqnSign): boolean {
        if (['function.anonymous', 'class.anonymous'].includes(sign.footprint)) {
            try {
                delete (fn as {name: string}).name;
                Object.defineProperty(fn, 'name', {value: name, configurable: false, writable: false, enumerable: true});
            } catch (e) {
                this.LOG.native(e, 'rename.anonymous', {name, fn, sign});
                return false;
            }
        }
        return true;
    }
    protected _signNonMethods(type: string, holder: unknown): void {
        this.LOG.info(type, this.signed(holder));
        this._runHooks(holder);
    }
    protected _group(ins: unknown, group: string, ...prefixes: Array<string>): void {
        if (!leyyo.is.object(ins, true)) {
            throw new DeveloperException('fqn.invalid-root', {group, prefixes}).with(this);
        }
        let obj: unknown;
        let name: string;
        const names = this._readName(prefixes);
        if (group !== 'file') {
            if (Object.keys(ins).length !== 1) {
                throw new DeveloperException('fqn.only-one-child', {group, prefixes, size: Object.keys(ins).length}).with(this);
            }
            const [key, mdl] = Object.entries(ins)[0];
            if (!leyyo.is.object(mdl, true)) {
                throw new DeveloperException('fqn.invalid-child', {group, prefixes, key}).with(this);
            }
            names.push(key);
            name = key;
            obj = mdl;
        } else {
            obj = ins;
            name = group;
        }
        const path = this._buildName(names);
        for (const [member, item] of Object.entries(obj)) {
            const sign = this._prepareSign(item, true);
            if (!sign) {
                continue;
            }
            if (sign.fqn) {
                continue;
            }
            this._renameAnonymous(member, item, sign);
            if (sign.footprint.startsWith('function')) {
                this._func(item as FuncLike, sign, path);
            }
            else if (sign.footprint.startsWith('class')) {
                this._clazz(item as ClassLike, sign, path);
            } else {
                if (!sign?.constructor?.fqn) {
                    let sign2: FqnSigned;
                    if (leyyo.is.object(item, true)) {
                        sign2 = this._possibleEnum(member, item, path) as FqnSigned;
                    }
                    if (!sign2) {
                        sign2 = this._possibleArray(member, item, path) as FqnSigned;
                    }
                    if (leyyo.is.object(sign2, true)) {
                        this._setDirect(item, sign2);
                        this._signNonMethods('sub-object', item);
                    } else if (!sign2) {
                        this.LOG.warn('ignored.object', {name, member, sign});
                    }
                }
            }
        }
        this._setDirect(obj, {name: this._buildName(names), type: group as FqnValueType, footprint: group});
        this._signNonMethods(group, obj);
    }
    protected _isValidMethod(target: FuncLike|ObjectLike, key: string, isInstance: boolean): boolean {
        const desc = leyyo.system.propertyDescriptor(target, key, isInstance);
        if (!desc) {
            return false;
        }
        return typeof desc.value === 'function' && typeof desc.get !== 'function';
    }
    protected _clazz(fn: ClassLike, sign: FqnSign, path: string): void {
        if (!this._isTarget(fn.name, fn)) {
            return;
        }
        // region is-already-signed
        try {
            if (this._set.has(fn as ClassLike)) {
                return;
            }
            this._set.add(fn as ClassLike);
        }
        catch (e) {
            return;
        }
        // endregion is-already-signed
        // region is-inherited
        const parent = Object.getPrototypeOf(fn);
        if (parent) {
            this._clazz(fn, null, path);
        }
        // endregion is-inherited
        // region class
        if (!sign) {
            sign = this._prepareSign(fn, false);
        }
        path = (path ? `${path}.` : '') + `${fn.name}`;
        this._setDirect(fn, {name: path, type: 'class', footprint: sign.footprint});
        // endregion class
        // region instance-members
        if (this._isTarget(fn.name, fn.prototype)) {
            Object.getOwnPropertyNames(fn.prototype).forEach(property => {
                if (this._isValidMethod(fn.prototype, property, true)) {
                    this._setDirect(fn.prototype[property], {name: `${path}.${property}`, type: 'method', footprint: 'method.instance'});
                }
            });
        }
        // endregion instance-members
        // region static-members
        Object.getOwnPropertyNames(fn).forEach(property => {
            if (this._isValidMethod(fn, property, false)) {
                this._setDirect(fn[property], {name: `${path}.${property}`, type: 'method', footprint: 'method.static'});
            }
        });
        // endregion static-members
        this._signNonMethods('class', fn);
    }
    protected _func(fn: FuncLike, sign: FqnSign, path: string) {
        path = (path ? `${path}.` : '') + ((fn.name !== null && fn.name !== '') ? fn.name : '<anonymous>');
        this._setDirect(fn, {name: path, type: 'function', footprint: sign.footprint});
        this._signNonMethods('function', fn);
    }
    protected get _emptySigned(): FqnSigned {
        return {...{name: null, type: null, footprint: null}};
    }
    protected _refreshInstance(name: string, target: ObjectLike): void {
        const fn = target?.constructor?.prototype as FuncLike;
        if (fn) {
            Object.getOwnPropertyNames(fn).forEach(property => {
                if (this._isValidMethod(fn, property, true)) {
                    const old = fn[property].name;
                    fn[property] = fn[property].bind(target);
                    this._setDirect(fn[property], {name: `${name}.${property}`, type: 'method', footprint: 'method.instance'});
                    try {
                        fn[property].name = old;
                    } catch (e) {}
                }
            });
        }
    }
    protected _refreshStatics(name: string, fn: FuncLike): void {
        Object.getOwnPropertyNames(fn).forEach(property => {
            if (this._isValidMethod(fn, property, false)) {
                const old = fn[property].name;
                fn[property] = fn[property].bind(fn);
                this._setDirect(fn[property], {name: `${name}.${property}`, type: 'method', footprint: 'method.static'});
                try {
                    fn[property].name = old;
                } catch (e) {}
            }
        });
    }
    // endregion private
    // region sign
    get key(): Symbol {
        return FQN_KEY;
    }
    is(value: unknown): boolean {
        return !!this._desc(value);
    }
    onSigned(holder: unknown, lambda: FuncLike): void {
        if (leyyo.is.empty(holder) || !['object', 'function'].includes(typeof holder)) {
            return;
        }
        try {
            const value: Array<FuncLike> = [];
            const desc = Object.getOwnPropertyDescriptor(holder, FQN_HOOK);
            if (desc) {
                if (leyyo.is.array(desc.value, true)) {
                    value.push(...desc.value);
                }
                delete holder[FQN_HOOK];
            }
            value.push(lambda);
            Object.defineProperty(holder, FQN_HOOK, {value, configurable: false, writable: false, enumerable: false});
        } catch (e) {
            this.LOG.native(e, 'onSigned', this.signed(holder, false));
        }
    }
    protected _desc(value: unknown): FqnValues {
        if (!value) {
            return null;
        }
        const desc = Object.getOwnPropertyDescriptor(value, FQN_KEY);
        if (Array.isArray(desc?.value)) {
            return desc.value as FqnValues;
        }
        return null;
    }
    signed(value: unknown, nullable?: boolean): FqnSigned {
        if (leyyo.is.empty(value)) {
            return nullable ? null : this._emptySigned;
        }
        try {
            const ty = typeof value;
            switch (ty) {
                case 'string':
                case 'boolean':
                case 'number':
                case 'bigint':
                case 'symbol':
                    return {name: ty, type: ty as FqnValueType, footprint: 'primitive'};
                case 'object':
                    const desc1 = this._desc(value?.constructor);
                    if (desc1) {
                        return {name: desc1[0], type: desc1[1], footprint: desc1[2]};
                    }
                    return {name: value?.constructor?.name ?? null as string, type: 'object', footprint: null};
                case "function":
                    const desc2 = this._desc(value);
                    if (desc2) {
                        return {name: desc2[0], type: desc2[1], footprint: desc2[2]};
                    }
                    return {name: (value as FuncLike)?.name ?? null as string, type: 'object', footprint: null};
                default:
                    return nullable ? null : this._emptySigned;
            }
        } catch (e) {
            this.LOG.native(e, 'get.signed', {value});
        }
        return nullable ? null : this._emptySigned;
    }
    name(value: unknown): string {
        return this.signed(value).name;
    }
    type(value: unknown): FqnValueType {
        return this.signed(value).type as FqnValueType;
    }
    footprint(value: unknown): string {
        return this.signed(value).footprint;
    }
    // endregion sign
    // region dimensions
    refresh(target: ObjectLike|FuncLike, forced?: boolean): void {
        if (!target || !['function', 'object'].includes(typeof target)) {
            return;
        }
        const name = (typeof target === 'function') ? target.name : (target as ObjectLike).constructor?.name;
        if (!this._isTarget(name, target)) {
            return;
        }
        const sign = this.signed(target);
        if (typeof target === 'function') {
            if (!this.is(target)) {
                this.clazz(target as ClassLike);
            }
            this._refreshStatics(sign.name, target as FuncLike);
        }
        else {
            if (!this.is(target?.constructor)) {
                this.clazz(target?.constructor as ClassLike);
            }
            this._refreshInstance(sign.name, target as ObjectLike);
        }
    }
    clazz(clazz: ClassLike, ...prefixes: Array<string>): void {
        const sign = this._prepareSign(clazz, false);
        if (!sign || !sign.footprint.startsWith('class')) {
            throw new DeveloperException('fqn.invalid-class', {clazz, sign}).with(this);
        }
        this._clazz(clazz, sign, this._buildName(this._readName(prefixes)));
    }
    func(fn: FuncLike, ...prefixes: Array<string>): void {
        const sign = this._prepareSign(fn, false);
        if (!sign || !sign.footprint.startsWith('function')) {
            throw new DeveloperException('fqn.invalid-function', {fn, sign}).with(this);
        }
        this._func(fn, sign, this._buildName(this._readName(prefixes)));
    }
    enumeration(name: string, value: ObjectLike, ...prefixes: Array<string>): void {
        const sign = this._possibleEnum(name, value, ...prefixes);
        if (sign === true) {
            return;
        }
        if (sign === false) {
            throw new DeveloperException('fqn.invalid-enumeration', {name, value}).with(this);
        }
        sign.footprint = 'enumeration.defined';
        this._setDirect(value, sign);
        this._signNonMethods('enumeration', value);
    }
    module(ins: unknown, ...prefixes: Array<string>): void {
        this._group(ins, 'module', ...prefixes);
    }
    namespace(ins: unknown, ...prefixes: Array<string>): void {
        this._group(ins, 'namespace', ...prefixes);
    }
    file(ins: unknown, ...prefixes: Array<string>): void {
        this._group(ins, 'file', ...prefixes);
    }
    object(name: string, value: ObjectLike, ...prefixes: Array<string>): void {
        const names = this._readName(prefixes);
        if (!value || typeof value !== 'object') {
            throw new DeveloperException('fqn.invalid-object', {name, value}).with(this);
        }
        names.push(name);
        this._setDirect(value, {name: this._buildName(names), type: 'object', footprint: 'object.object'});
        this._signNonMethods('object', value);
    }
    patch(obj: unknown, ...prefixes: Array<string>): void {
        return this.module(obj as RecLike, ...prefixes);
    }
    reports(...objects: Array<unknown>): Array<FqnSignedTree> {
        return objects.map(obj => this.report(obj));
    }

    report(obj: unknown): FqnSignedTree {
        const sign = this.signed(obj) as FqnSignedTree;
        if (!sign.name) {
            return sign;
        }
        switch (sign.type) {
            case 'function':
            case 'enumeration':
            case 'object':
                break;
            case 'class':
                sign.children = {};
                if (this._isTarget(sign.name, obj)) {
                    if (typeof obj === 'function') {
                        Object.getOwnPropertyNames(obj).forEach(key => {
                            if (this._isValidMethod(obj, key, false)) {
                                sign.children[`::${key}`] = this.signed(obj[key]);
                            }
                        });
                        const proto = (obj as FuncLike).prototype;
                        if (this._isTarget(sign.name, proto)) {
                            Object.getOwnPropertyNames(proto).forEach(key => {
                                if (this._isValidMethod(proto, key, true)) {
                                    sign.children[key] = this.signed(proto[key]);
                                }
                            });
                        }
                    }
                    else {
                        const constructor = (obj as ObjectLike).constructor;
                        if (this._isTarget(sign.name, constructor)) {
                            if (this._isTarget(sign.name, constructor)) {
                                Object.getOwnPropertyNames(constructor).forEach(key => {
                                    if (this._isValidMethod(constructor, key, false)) {
                                        sign.children[`::${key}`] = this.signed(constructor[key]);
                                    }
                                });
                            }
                            const proto = constructor?.prototype;
                            if (this._isTarget(sign.name, proto)) {
                                Object.getOwnPropertyNames(proto).forEach(key => {
                                    if (this._isValidMethod(proto, key, true)) {
                                        sign.children[key] = this.signed(proto[key]);
                                    }
                                });
                            }
                        }
                    }
                }
                break;
            case 'file':
            case 'module':
            case 'namespace':
                sign.children = {};
                for (const [k, v] of Object.entries(obj)) {
                    sign.children[k] = this.report(v);
                }
                break;
        }
        return sign;
    }
    // endregion dimensions
}
export const fqnPool: FqnPoolLike = new FqnPool();
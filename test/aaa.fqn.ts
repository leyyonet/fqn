import {strict as assert} from "assert";
import {fqnPool} from "../src";

export function _fqn(title: string, value: unknown, name: string, type?: string, footprint?: string): void {
    describe(title, () => {
        it('name', () => {
            assert.equal(fqnPool.name(value), name);
        });
        if (type) {
            it('type', () => {
                assert.equal(fqnPool.type(value), type);
            });
        }
        if (footprint) {
            it('footprint', () => {
                assert.equal(fqnPool.footprint(value), footprint);
            });
        }
    });
}
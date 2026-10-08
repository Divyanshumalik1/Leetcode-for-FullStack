import { describe, it, expect, vi } from 'vitest';
import solution from './solution.js';

// Turn every Requirement and Edge case in README.md into a test — before you implement.
// Timers? Use vi.useFakeTimers() and vi.advanceTimersByTime(ms).

describe('Array.prototype.myMap', () => {
  it('returns a new array of callback results', () => {
    const arr = [1, 2, 3];
    const out = arr.myMap((x) => x * 2);
    expect(out).toEqual([2, 4, 6]);
    expect(out).not.toBe(arr);
    expect(arr).toEqual([1, 2, 3]);
  });

  it('passes value, index and the array to the callback', () => {
    const arr = ['a', 'b'];
    const cb = vi.fn();
    arr.myMap(cb);
    expect(cb).toHaveBeenNthCalledWith(1, 'a', 0, arr);
    expect(cb).toHaveBeenNthCalledWith(2, 'b', 1, arr);
  });

  it('uses thisArg as `this` inside the callback', () => {
    const ctx = { k: 10 };
    expect([1, 2].myMap(function (x) { return x * this.k; }, ctx)).toEqual([10, 20]);
  });

  it('returns [] for an empty array without calling the callback', () => {
    const cb = vi.fn();
    expect([].myMap(cb)).toEqual([]);
    expect(cb).not.toHaveBeenCalled();
  });

  it('skips holes and keeps them in the result', () => {
    const cb = vi.fn((x) => x);
    const out = [1, , 3].myMap(cb);
    expect(cb).toHaveBeenCalledTimes(2);
    expect(out.length).toBe(3);
    expect(1 in out).toBe(false);
  });

  it('throws a TypeError when the callback is not a function', () => {
    expect(() => [1].myMap(null)).toThrow(TypeError);
  });

  it('does not visit elements added during iteration', () => {
    const arr = [1, 2];
    const out = arr.myMap((x) => { arr.push(x); return x; });
    expect(out).toEqual([1, 2]);
  });
});
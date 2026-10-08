// Implement `map`
// Spec → README.md · tests → solution.test.js · run: npm run t -- <this folder>

Array.prototype.myMap = function (callback, thisArg) {
  if (typeof callback !== 'function') {
    throw new TypeError(`${callback} is not a function`);
  }
  const len = this.length;
  const result = new Array(len);
  for (let i = 0; i < len; i++) {
    if (i in this) {
      result[i] = callback.call(thisArg, this[i], i, this);
    }
  }
  return result;
};
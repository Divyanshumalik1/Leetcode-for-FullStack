# Implement `map`

> Section 3 · template: js · started 2026-10-08

Write this spec **before** any code — the way an interviewer would hand it to you, plus the questions you'd ask back.

## Prompt
Implement Array.prototype.myMap so it behaves like the built-in map.

## Clarifying questions I'd ask
- Should it mutate the original array? (No.)
- What arguments does the callback get? (value, index, array)
- Should it support thisArg? (Yes.)
- What about sparse arrays like [1, , 3]? (Skip holes, keep them in the result.)
- What if the callback isn't a function? (Throw a TypeError.)

## Requirements (my assumptions)
- [ ] Returns a new array; the original is unchanged
- [ ] Callback receives (value, index, array)
- [ ] thisArg becomes `this` inside the callback
- [ ] Throws TypeError when the callback isn't a function

## Edge cases
- Empty array → [] and the callback is never called
- Holes are skipped and stay holes in the result
- Elements pushed during iteration are not visited

## Follow-ups (the interviewer changes the rules)
- Implement it with reduce instead of a loop
- Make an async version: mapAsync with a concurrency limit

## Complexity / tradeoffs
<!-- Fill in after attempt 1: time and space, and why you chose this approach. -->


# @md/resolvable

Creates a Promise with an explicit `resolve` and `reject` function

## Example

```ts
const lock = resolvable<void>();
for(const process of list)
 lock.then(process);
lock.resolve();
```
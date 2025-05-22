/**
 * A `Promise` with it's `resolve` and `reject` function available on the `Promise`
 *
 * @example
 * ```ts
 * const lock = resolvable<void>();
 * for(const process of list)
 *  lock.then(process);
 * lock.resolve();
 * ```
 */
export type Resolvable<T> = Promise<T> & {
  resolve: (value: T | PromiseLike<T>) => void;
  // deno-lint-ignore no-explicit-any
  reject: (reason?: any) => void;
};

/**
 * Creates a new {@link Resolvable}
 *
 * @example
 * ```ts
 * const lock = resolvable<void>();
 * for(const process of list)
 *  lock.then(process);
 * lock.resolve();
 * ```
 */
export default function resolvable<T>(): Resolvable<T> {
  let resolve: (value: T | PromiseLike<T>) => void;
  // deno-lint-ignore no-explicit-any
  let reject: (reason?: any) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  // @ts-expect-error We know resolve and reject are defined
  return Object.assign(promise, { resolve, reject });
}

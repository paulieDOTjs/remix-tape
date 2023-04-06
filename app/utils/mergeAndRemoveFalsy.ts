import { identity, merge, pickBy } from "lodash";

type MaybeObject = null | undefined | Record<string, any>;

type Falsy = null | undefined | false;

type MergedObjs<T1 extends MaybeObject, T2 extends MaybeObject> = {
  [K1 in keyof T1 as T1[K1] extends Falsy ? never : K1]: K1 extends keyof T2
    ? T2[K1] extends Falsy
      ? T1[K1] extends Falsy
        ? never
        : T1[K1]
      : T2[K1]
    : T1[K1];
} & {
  [K2 in keyof T2 as T2[K2] extends Falsy ? never : K2]: T2[K2] extends Falsy
    ? never
    : T2[K2];
};

export function mergeAndRemoveFalsy<
  T1 extends MaybeObject,
  T2 extends MaybeObject
>(obj: T1, obj2: T2): MergedObjs<T1, T2>;

export function mergeAndRemoveFalsy<
  T1 extends MaybeObject,
  T2 extends MaybeObject,
  T3 extends MaybeObject
>(obj: T1, obj2: T2, obj3: T3): MergedObjs<T1, MergedObjs<T2, T3>>;

export function mergeAndRemoveFalsy<
  T1 extends MaybeObject,
  T2 extends MaybeObject,
  T3 extends MaybeObject,
  T4 extends MaybeObject
>(
  obj: T1,
  obj2: T2,
  obj3: T3,
  obj4: T4
): MergedObjs<T1, MergedObjs<T2, MergedObjs<T3, T4>>>;

export function mergeAndRemoveFalsy<
  T1 extends MaybeObject,
  T2 extends MaybeObject,
  T3 extends MaybeObject,
  T4 extends MaybeObject,
  T5 extends MaybeObject
>(
  obj: T1,
  obj2: T2,
  obj3: T3,
  obj4: T4,
  obj5: T5
): MergedObjs<T1, MergedObjs<T2, MergedObjs<T3, MergedObjs<T4, T5>>>>;

export function mergeAndRemoveFalsy(
  obj: MaybeObject,
  ...otherArgs: MaybeObject[]
) {
  return pickBy(merge(obj ?? {}, ...otherArgs.filter((o) => o)), identity);
}

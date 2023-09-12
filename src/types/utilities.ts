// https://stackoverflow.com/questions/73732549/narrow-number-argument-of-function-to-be-literal-type?noredirect=1#comment130199140_73732549
// eslint-disable-next-line @typescript-eslint/ban-types
export type NoInfer<T> = T & {}

export type MaybeReadonly<T> = T | Readonly<T>
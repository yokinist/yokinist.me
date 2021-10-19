const nonNullable = <T>(value: T): value is NonNullable<T> => value != null;
export default nonNullable;

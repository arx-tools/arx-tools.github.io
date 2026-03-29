export declare class State<T> extends EventTarget {
    private value;
    constructor(value: T);
    get currentValue(): T;
    set currentValue(newValue: T);
    private changeValue;
}

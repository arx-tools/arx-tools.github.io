export class State extends EventTarget {
    value;
    constructor(value) {
        super();
        this.value = value;
        this.changeValue(undefined, value);
    }
    get currentValue() {
        return this.value;
    }
    set currentValue(newValue) {
        this.changeValue(this.value, newValue);
    }
    changeValue(oldValue, newValue) {
        this.value = newValue;
        const changeEvent = new CustomEvent('change', {
            detail: {
                oldValue,
                currentValue: newValue,
            },
        });
        this.dispatchEvent(changeEvent);
    }
}
//# sourceMappingURL=State.js.map
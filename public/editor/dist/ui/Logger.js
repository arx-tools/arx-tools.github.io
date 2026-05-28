export class Logger {
    target;
    constructor(target) {
        this.target = target;
    }
    log(text, appendLogTo) {
        return this.addLine('log', text, appendLogTo);
    }
    error(text, appendLogTo) {
        return this.addLine('error', 'Error: ' + text, appendLogTo);
    }
    addLine(className, text, appendLogTo) {
        if (appendLogTo !== undefined) {
            appendLogTo.textContent = appendLogTo.textContent + ' ' + text;
            return appendLogTo;
        }
        const line = document.createElement('div');
        line.classList.add(className);
        line.textContent = text;
        this.target.append(line);
        this.target.scrollTo({
            top: 100_000,
            left: 0,
            behavior: 'instant',
        });
        return line;
    }
}
//# sourceMappingURL=Logger.js.map
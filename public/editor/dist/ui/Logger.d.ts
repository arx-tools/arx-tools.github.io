export declare class Logger {
    private readonly target;
    constructor(target: HTMLDivElement);
    log(text: string, appendLogTo?: HTMLDivElement): HTMLDivElement;
    error(text: string, appendLogTo?: HTMLDivElement): HTMLDivElement;
    private addLine;
}

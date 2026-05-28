import { State } from './State.js';
type LoadingState = 'idle' | 'loading' | 'fulfilled' | 'rejected';
export declare const isLoading: State<LoadingState>;
export declare const downloadBtn: HTMLButtonElement;
export declare const loadingIndicator: HTMLParagraphElement;
export declare const mouseLocked: HTMLParagraphElement;
export declare const mouseUnlocked: HTMLParagraphElement;
export declare const canvas: HTMLCanvasElement;
export declare const wireframeVisible: State<boolean>;
export declare const cameraLightVisible: State<boolean>;
export declare const uiTitle: State<string>;
export declare enum MouseButton {
    Left = 1,
    Right = 2,
    Middle = 4
}
export declare const mousePressed: Record<MouseButton, {
    oldValue: boolean;
    currentValue: boolean;
}>;
export declare function updateMouseButtonState(button: MouseButton, value: boolean): void;
export declare function updateMouseButtonStates(event: MouseEvent): void;
export {};

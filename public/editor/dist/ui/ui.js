import { State } from './State.js';
export const isLoading = new State('idle');
const crosshair = document.querySelector('#crosshair');
export const downloadBtn = document.querySelector('#download');
export const loadingIndicator = document.querySelector('#loading-indicator');
export const mouseLocked = document.querySelector('#mouse-locked');
export const mouseUnlocked = document.querySelector('#mouse-unlocked');
isLoading.addEventListener('change', (event) => {
    const value = event.detail?.currentValue;
    loadingIndicator.classList.toggle('hidden', value === 'idle' || value === 'fulfilled');
    loadingIndicator.classList.toggle('error', value === 'rejected');
    if (value === 'loading') {
        loadingIndicator.textContent = 'Loading, please wait...';
    }
    else if (value === 'rejected') {
        loadingIndicator.textContent = 'An error occurred, see logs for details!';
    }
    downloadBtn.disabled = value !== 'fulfilled';
    crosshair.classList.toggle('hidden', value === 'loading');
});
loadingIndicator.classList.toggle('hidden', isLoading.currentValue !== 'loading');
downloadBtn.disabled = isLoading.currentValue !== 'fulfilled';
export const canvas = document.querySelector('#screen');
mouseLocked.style.display = 'none';
mouseUnlocked.style.display = 'none';
// ------------
export const wireframeVisible = new State(false);
const wireframeVisibleCheckbox = document.querySelector('#wireframe-visible');
wireframeVisibleCheckbox.addEventListener('input', () => {
    wireframeVisible.currentValue = wireframeVisibleCheckbox.checked;
});
wireframeVisible.addEventListener('change', (event) => {
    wireframeVisibleCheckbox.checked = event.detail?.currentValue ?? false;
});
wireframeVisibleCheckbox.checked = wireframeVisible.currentValue;
// ------------
export const cameraLightVisible = new State(false);
const cameraLightVisibleCheckbox = document.querySelector('#camera-light-visible');
cameraLightVisibleCheckbox.addEventListener('input', () => {
    cameraLightVisible.currentValue = cameraLightVisibleCheckbox.checked;
});
cameraLightVisible.addEventListener('change', (event) => {
    cameraLightVisibleCheckbox.checked = event.detail?.currentValue ?? false;
});
cameraLightVisibleCheckbox.checked = cameraLightVisible.currentValue;
// ------------
document.addEventListener('keypress', (event) => {
    // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check -- we don't need to cover all keys here
    switch (event.code) {
        case 'KeyF': {
            cameraLightVisible.currentValue = !cameraLightVisible.currentValue;
            break;
        }
        case 'KeyX': {
            wireframeVisible.currentValue = !wireframeVisible.currentValue;
            break;
        }
    }
}, false);
// ------------
export const uiTitle = new State('');
const uiTitleElement = document.querySelector('#title');
uiTitle.addEventListener('change', (event) => {
    uiTitleElement.textContent = event.detail?.currentValue ?? '';
});
// ------------
export var MouseButton;
(function (MouseButton) {
    MouseButton[MouseButton["Left"] = 1] = "Left";
    MouseButton[MouseButton["Right"] = 2] = "Right";
    MouseButton[MouseButton["Middle"] = 4] = "Middle";
})(MouseButton || (MouseButton = {}));
export const mousePressed = {
    [MouseButton.Left]: { oldValue: false, currentValue: false },
    [MouseButton.Right]: { oldValue: false, currentValue: false },
    [MouseButton.Middle]: { oldValue: false, currentValue: false },
};
export function updateMouseButtonState(button, value) {
    mousePressed[button] = {
        oldValue: mousePressed[button].currentValue,
        currentValue: value,
    };
}
export function updateMouseButtonStates(event) {
    updateMouseButtonState(MouseButton.Left, (event.buttons & MouseButton.Left) > 0);
    updateMouseButtonState(MouseButton.Right, (event.buttons & MouseButton.Right) > 0);
    updateMouseButtonState(MouseButton.Middle, (event.buttons & MouseButton.Middle) > 0);
}
//# sourceMappingURL=ui.js.map
import { State } from './State.js';
export const isLoading = new State(false);
export const downloadBtn = document.querySelector('#download');
export const loadingIndicator = document.querySelector('#loading-indicator');
export const mouseLocked = document.querySelector('#mouse-locked');
export const mouseUnlocked = document.querySelector('#mouse-unlocked');
isLoading.addEventListener('change', (event) => {
    if (event.detail?.currentValue === true) {
        downloadBtn.disabled = true;
        loadingIndicator.style.visibility = 'visible';
    }
    else {
        downloadBtn.disabled = false;
        loadingIndicator.style.visibility = 'hidden';
    }
});
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
//# sourceMappingURL=ui.js.map
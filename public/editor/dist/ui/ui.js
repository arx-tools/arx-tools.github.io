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
//# sourceMappingURL=ui.js.map
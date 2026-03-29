import { State } from './ui/State.js';
export const isLoading = new State(false);
export const downloadBtn = document.querySelector('#download');
export const loadingIndicator = document.querySelector('#loading-indicator');
isLoading.addEventListener('change', (event) => {
    if (event.detail?.currentValue === true) {
        downloadBtn.disabled = true;
        loadingIndicator.style.display = 'block';
    }
    else {
        downloadBtn.disabled = false;
        loadingIndicator.style.display = 'none';
    }
});
//# sourceMappingURL=ui.js.map
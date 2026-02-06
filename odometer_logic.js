document.addEventListener('DOMContentLoaded', () => {
    let count = 0;
    const binDisplay = document.getElementById('bin-display');
    const decDisplay = document.getElementById('dec-val');
    
    const upBtn = document.getElementById('step-up');
    const downBtn = document.getElementById('step-down');
    const tenBtn = document.getElementById('add-ten');
    const randBtn = document.getElementById('random-btn');
    const resetBtn = document.getElementById('reset-bin');

    const updateDisplay = () => {
        // Base-2 translation and padding for uniform display
        binDisplay.innerText = count.toString(2).padStart(8, '0');
        decDisplay.innerText = count;
    };

    upBtn.addEventListener('click', () => {
        count = (count + 1) % 256;
        updateDisplay();
    });

    downBtn.addEventListener('click', () => {
        count = (count - 1 + 256) % 256;
        updateDisplay();
    });

    tenBtn.addEventListener('click', () => {
        count = (count + 10) % 256;
        updateDisplay();
    });

    randBtn.addEventListener('click', () => {
        count = Math.floor(Math.random() * 256);
        updateDisplay();
    });

    resetBtn.addEventListener('click', () => {
        count = 0;
        updateDisplay();
    });

    updateDisplay();
});
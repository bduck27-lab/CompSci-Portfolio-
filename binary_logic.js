document.addEventListener('DOMContentLoaded', () => {
    let count = 0;
    const binDisplay = document.getElementById('bin-display');
    const decDisplay = document.getElementById('dec-val');
    
    // Buttons
    const upBtn = document.getElementById('step-up');
    const downBtn = document.getElementById('step-down');
    const tenBtn = document.getElementById('add-ten');
    const randBtn = document.getElementById('random-btn');
    const resetBtn = document.getElementById('reset-bin');

    function updateDisplay() {
        // Convert decimal to binary string
        let binaryString = count.toString(2);
        
        // Pad with zeros to keep it 8-bit
        binaryString = binaryString.padStart(8, '0');
        
        binDisplay.innerText = binaryString;
        decDisplay.innerText = count;
    }

    // Add 1
    upBtn.addEventListener('click', () => {
        if (count < 255) {
            count++;
        } else {
            count = 0; // Overflow
        }
        updateDisplay();
    });

    // Subtract 1
    downBtn.addEventListener('click', () => {
        if (count > 0) {
            count--;
        } else {
            count = 255; // Underflow
        }
        updateDisplay();
    });

    // Add 10
    tenBtn.addEventListener('click', () => {
        count = (count + 10) % 256;
        updateDisplay();
    });

    // Randomize
    randBtn.addEventListener('click', () => {
        count = Math.floor(Math.random() * 256);
        updateDisplay();
    });

    // Reset
    resetBtn.addEventListener('click', () => {
        count = 0;
        updateDisplay();
    });

    // Initialize
    updateDisplay();
});
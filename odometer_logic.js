// odometer_logic.js - JavaScript Code for the Odometer App
// This script contains the logic to manage the odometer display and mileage calculation.

document.addEventListener('DOMContentLoaded', () => {
    // --- STATE VARIABLES ---
    let currentMileage = 0.0;
    const stepSize = 0.1; // Distance added/subtracted per fixed step button

    // --- DOM ELEMENT REFERENCES ---
    const mileageDisplay = document.getElementById('mileage-display');
    const driveButton = document.getElementById('drive-button');
    const backtrackButton = document.getElementById('backtrack-button');
    const resetButton = document.getElementById('reset-button');
    const driveInput = document.getElementById('drive-input');
    const addButton = document.getElementById('add-custom-button');


    // --- UTILITY FUNCTIONS ---

    // Function to format the mileage display with a fixed number of decimals
    const updateDisplay = () => {
        // Ensure only two decimal places are shown, simulating a real odometer
        if (mileageDisplay) {
            mileageDisplay.textContent = currentMileage.toFixed(2) + ' miles';
        }
    };

    // --- MAIN LOGIC FUNCTIONS ---

    // 1. Simulate driving (increase mileage)
    const handleDrive = () => {
        // Increment mileage by the fixed step size and ensure proper float arithmetic
        currentMileage = parseFloat((currentMileage + stepSize).toFixed(2));
        updateDisplay();
    };

    // 2. Simulate backtracking (decrease mileage)
    const handleBacktrack = () => {
        // Decrement mileage, ensuring it doesn't drop below zero
        if (currentMileage >= stepSize) {
            currentMileage = parseFloat((currentMileage - stepSize).toFixed(2));
        } else {
            currentMileage = 0.0;
        }
        updateDisplay();
    };

    // 3. Reset the odometer
    const handleReset = () => {
        currentMileage = 0.0;
        updateDisplay();
    };
    
    // 4. Handle custom input addition
    const handleCustomAdd = () => {
        if (!driveInput) return;
        
        const value = parseFloat(driveInput.value);
        
        // Basic input validation: check if it's a number and positive
        if (isNaN(value) || value <= 0) {
            // In a real app, you'd show a message box to the user instead of logging to console
            console.error("Invalid distance entered. Must be a positive number.");
            driveInput.value = ''; // Clear the input field
            return;
        }
        
        // Add the custom value
        currentMileage = parseFloat((currentMileage + value).toFixed(2));
        driveInput.value = ''; // Clear the input field after successful addition
        updateDisplay();
    };

    // --- EVENT LISTENERS ---
    
    if (driveButton) {
        driveButton.addEventListener('click', handleDrive);
    }

    if (backtrackButton) {
        backtrackButton.addEventListener('click', handleBacktrack);
    }
    
    if (resetButton) {
        resetButton.addEventListener('click', handleReset);
    }
    
    if (addButton) {
        addButton.addEventListener('click', handleCustomAdd);
    }

    // Initialize the display when the script loads
    updateDisplay();
});

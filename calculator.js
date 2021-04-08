// Get all buttons on calculator

const calculatorContainer = document.querySelector('.calculator-container');

const calculatorButtons = calculatorContainer.querySelector('.calculator-buttons');

const numberDisplay = document.querySelector('.displayNumbers');

// initializing variables
let wasPreviousKeyPressedOperator = false;

let operator = undefined;

let firstValue = undefined;

const min = 1;
const max = 9;

// generates random number between min and max range (1-9), gives the effect
// that a number from the calculators buttons are being randomly generated
function getRandomNumber(minRange, maxRange) {
	var result = Math.floor(Math.random() * (maxRange - minRange + 1) + minRange);
	return result;
}

// function that handles the calculations on the calculator (+,-,*,/)

function caclculate(firstValue, secondValue, operator) {
	let result = '';
	let firstValueAsNumber = parseFloat(firstValue);
	let secondValueAsNumber = parseFloat(secondValue);
	if (operator === 'plus') {
		result = firstValueAsNumber + secondValueAsNumber;
	} else if (operator === 'minus') {
		result = firstValueAsNumber - secondValueAsNumber;
	} else if (operator === 'divide') {
		result = firstValueAsNumber / secondValueAsNumber;
	} else if (operator === 'multiply') {
		result = firstValueAsNumber * secondValueAsNumber;
	}
	return result;
}

// created a function to change the display
function setDisplay(newDisplay) {
	numberDisplay.textContent = newDisplay;
}

// listens for click on keypad of calculator
calculatorButtons.addEventListener('click', (event) => {
	if (event.target.matches('button')) {
		// action buttons are the only  elements with id's
		const key = event.target;
		const action = key.id;
		const keyPressedContent = key.textContent;
		const currentlyDisplayedNumber = numberDisplay.textContent;

		// take away class from all buttons inside calculator buttons div
		Array.from(calculatorButtons.children).forEach((button) => {
			button.classList.remove('is-active');
		});

		// if a number is pressed
		if (!action) {
			if (currentlyDisplayedNumber === '0' || wasPreviousKeyPressedOperator === true) {
				setDisplay(keyPressedContent);
			} else {
				setDisplay(currentlyDisplayedNumber + keyPressedContent);
			}
			// set this back to false because number was pressed
			wasPreviousKeyPressedOperator = false;
		}

		// dealing with operators
		if (action === 'plus' || action === 'minus' || action === 'multiply' || action === 'divide') {
			key.classList.add('is-active');
			firstValue = currentlyDisplayedNumber;
			operator = action;
			wasPreviousKeyPressedOperator = true;
		}

		if (action === 'decimal') {
			if (wasPreviousKeyPressedOperator === true) {
				setDisplay('0.');
			} else if (!currentlyDisplayedNumber.includes('.')) {
				setDisplay(currentlyDisplayedNumber + '.');
			}
			wasPreviousKeyPressedOperator = false;
		}
		if (action === 'clear') {
			// reset values because clear button was pressed
			setDisplay('0');
			operator = undefined;
			firstValue = undefined;
			console.log('action pressed - cleared');
			wasPreviousKeyPressedOperator = false;
		}

		if (action === 'equals') {
			const currentValue = currentlyDisplayedNumber;
			const result = caclculate(firstValue, currentValue, operator);
			setDisplay(result);
			wasPreviousKeyPressedOperator = false;
		}
		if (action === 'random') {
			const currentValue = currentlyDisplayedNumber;
			const result = getRandomNumber(min, max);
			setDisplay(result);
			wasPreviousKeyPressedOperator = false;
		}
	}
});

//Grab all the buttons as in array
//Loop through the array and add eventListener to each button
//when the button is clicked, get the button's value and stiore in a gloabl variable
//grab the display element
//add the value to the display element 

//get all the button
const buttons = document.querySelectorAll('.btn');

const displayElement = document.querySelector('.display');

const buttonsArray = Array.from(buttons);

let stringToDisplay = '';

const operators = ['%', '/', 'x', '-', '+'];

let lastOperator = '';

//for audio to play
const audio = new Audio('cock-roaster.mp3');

buttonsArray.map((btn) => {
    btn.addEventListener('click', () => {
        const val = btn.innerText;
        console.log(val);

        if ( val === 'AC') {
            stringToDisplay = '';
            display();
            return;
        }

        if ( val === 'C') {
            stringToDisplay = stringToDisplay.slice(0, -1);
            return display(stringToDisplay);
        }

        if ( val === '=') {
            const lastChar = stringToDisplay[stringToDisplay.length - 1];

            if (operators.includes(lastChar)) {
                stringToDisplay = stringToDisplay.slice(0, -1);
            }
            
            return total();
        }

        if (operators.includes(val)) {

            if (!stringToDisplay) {
                return;
            }
            const lastChar = stringToDisplay[stringToDisplay.length - 1];

            if (operators.includes(lastChar)) {
                stringToDisplay = stringToDisplay.slice(0, -1);
            }

            lastOperator = val;
        }


        if (val === '.') {
            if (lastOperator) {
                const operatorIndex = stringToDisplay.lastIndexOf(lastOperator);
                

                const lastNumberSet = stringToDisplay.slice(operatorIndex + 1);


                if (lastNumberSet.includes('.')) {
                    return;
                }

                console.log(operatorIndex);
            }

            if(!lastOperator && stringToDisplay.includes('.')) {
                return;
            }
        }




        stringToDisplay += val;
        display(stringToDisplay);
    });
});

const display = (str) => {
    displayElement.innerText = str || '0.00';
};

const total = () => {
    const extra = randomNumber();

    if(extra > 0) {
        displayElement.style.background = 'red';
        displayElement.style.color = 'white'
        displayElement.classList.add('prank');
        audio.play();
    }

    const ttl = eval(stringToDisplay) + extra;
    display(ttl);
    stringToDisplay = ttl.toString();
};

const randomNumber = () => {
    const num = Math.round(Math.random() * 10);
    return num < 6 ? num : 0;
};

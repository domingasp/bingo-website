bingoNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,13, 14, 15,
                16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
                31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45,
                46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
                61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75]

bingoGrid = document.getElementById('bingo_grid_id');
bingoLast5Grid = document.getElementById('bing_last_five_id');
bingoCurrentNumber = document.getElementById('bingo_current_number_id');

// Create elements for bingo numbers
for (number of bingoNumbers) {
    newNumberSpan = document.createElement('SPAN');
    
    newNumberSpan.innerHTML = number;
    newNumberSpan.style.display = 'inline-block';
    newNumberSpan.style.width = '2rem';
    newNumberSpan.id = 'number_display_id_' + number;

    bingoGrid.appendChild(newNumberSpan);

    if (number % 15 == 0) {
        bingoGrid.appendChild(document.createElement('BR'))
    }
}

// Add last 5 number display
for (i = 1; i < 6; i++) {
    lastNumber = document.createElement('SPAN');

    lastNumber.innerHTML = '#';
    lastNumber.style.display = 'inline-block';
    lastNumber.style.width = '2rem';
    lastNumber.style.backgroundColor = 'cyan';
    lastNumber.id = 'last_number_displayed_id_' + i;

    bingoLast5Grid.appendChild(lastNumber);
}

function getNextBingoNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

function generateNextNumber() {
    if (bingoNumbers.length > 0) {
        newNumber = getNextBingoNumber(0, bingoNumbers.length);

        numberCalled = bingoNumbers[newNumber];
        document.getElementById('number_display_id_' + numberCalled).style.backgroundColor = 'green';
        bingoCurrentNumber.innerHTML = numberCalled;
        updateLast5Numbers(numberCalled);
        
        // Removes number from array
        const index = bingoNumbers.indexOf(numberCalled);
        if (index > -1) {
            bingoNumbers.splice(index, 1);
        }
    }
}

function updateLast5Numbers(number) {
    last5 = bingoLast5Grid.children
    for (i = last5.length - 1; i > 0; i--) {
        last5[i].innerHTML = last5[i-1].innerHTML;
    }
    last5[0].innerHTML = number;
}

function newGame() {
    bingoNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,13, 14, 15,
        16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45,
        46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
        61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75]

    // Reset styling of main grid
    for (cell of bingoGrid.children) {
        cell.style.backgroundColor = 'transparent';
    }

    // Reset values of last 5 numbers
    for (cell of bingoLast5Grid.children) {
        cell.innerHTML = '#';
    }

    // Reset display of current number
    bingoCurrentNumber.innerHTML = '--';
}
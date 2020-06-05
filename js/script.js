bingoGrid = document.getElementById("bingo-grid-id");
currentNumberLabel = document.getElementById("current-number-id");
latestNumbersDiv = document.getElementById("latest-numbers-div-id");
numberCheckInput = document.getElementById("number-check-input-id");
numberCheckResultText = document.getElementById("number-check-result-id");

bingoNumbersLabels = [];
latestNumbersLabels = [];
bingoMaxNumber = 90;

bingoNumbersCalled = [];
bingoNumbersNotCalled = [];

isPlaying = false;


// Create initial number grid
for (i = 1; i < 91; i++) {
    numberSpanNode = document.createElement("SPAN");
    numberSpanNode.innerHTML = i;

    numberSpanNode.classList.add("bingo-grid-div__number-grid-div__number-span");
    
    bingoGrid.appendChild(numberSpanNode);
    bingoNumbersLabels.push(numberSpanNode);
}


// Create latest 5 number labels
for (i = 0; i < 5; i++) {
    latestNumberSpanNode = document.createElement("SPAN");
    latestNumberSpanNode.innerHTML = "#";

    latestNumberSpanNode.classList.add("bingo-grid-div__latest-numbers-div__number-span");

    latestNumbersDiv.appendChild(latestNumberSpanNode);
    latestNumbersLabels.push(latestNumberSpanNode);
}


latestNumbersLabels.reverse()


function generateBingoNumber() {
    if (!isPlaying) {
        document.getElementById("select-bingo-range-id").disabled = true;
        bingoNumbersCalled = [];
        bingoNumbersNotCalled = Array.from(Array(bingoMaxNumber).keys());
        bingoNumbersNotCalled = shuffle(bingoNumbersNotCalled);
        isPlaying = true;
    }

    if (bingoNumbersNotCalled.length > 0) {
        indexOfNumber = bingoNumbersNotCalled.length - 1;

        // Change span element
        bingoNumbersLabels[bingoNumbersNotCalled[indexOfNumber]].style.backgroundColor = "#FCBF49";
        currentNumberLabel.innerHTML = bingoNumbersLabels[bingoNumbersNotCalled[indexOfNumber]].innerHTML
        updateLatestNumbers(bingoNumbersLabels[bingoNumbersNotCalled[indexOfNumber]].innerHTML);

        // Add number to the correct array
        bingoNumbersCalled.push(bingoNumbersNotCalled[indexOfNumber]);
        bingoNumbersNotCalled.pop();

        checkNumbers()
    }
}


function resetBingoGame() {
    isPlaying = false
    bingoNumbersCalled.forEach(number => {
        bingoNumbersLabels[number].style.backgroundColor = "white";
    });
    bingoNumbersCalled = [];
    currentNumberLabel.innerHTML = "--";
    updateLatestNumbers(0, true);
    checkNumbers();
    document.getElementById("select-bingo-range-id").disabled = false;
}


function updateLatestNumbers(newNumber = 0, resetLabels = false) {
    for (i = 0; i < latestNumbersLabels.length - 1; i++) {
        if (resetLabels) {
            latestNumbersLabels[i].innerHTML = "#";
        } else {
            latestNumbersLabels[i].innerHTML = latestNumbersLabels[i + 1].innerHTML;
        }
    }

    if (resetLabels) {
        latestNumbersLabels[latestNumbersLabels.length - 1].innerHTML = "#";
    } else {
        latestNumbersLabels[latestNumbersLabels.length - 1].innerHTML = newNumber;
    }
}


function checkNumbers() {
    input = numberCheckInput.value;
    isValid = true;

    inputNumbers = input.trim().split(' ');
    for (i = 0; i < inputNumbers.length; i++) {
        parsedNumber = parseInt(inputNumbers[i]);
        if (!bingoNumbersCalled.includes(parsedNumber - 1)) {
            isValid = false;
            break;
        }
    }

    if (isValid && bingoNumbersCalled.length > 0) {
        numberCheckResultText.innerHTML = "BINGO!";
        numberCheckResultText.style.color = "green";
        numberCheckResultText.style.fontWeight = 600;
    } else if (input.trim().length > 0) {
        numberCheckResultText.innerHTML = "Not bingo.";
        numberCheckResultText.style.color = "#E63B2E";
        numberCheckResultText.style.fontWeight = 600;
    } else {
        numberCheckResultText.innerHTML = "No numbers entered.";
        numberCheckResultText.style.color = "#323232";
        numberCheckResultText.style.fontWeight = 500;
    }
}


function setMaxBingoNumber(newValue) {
    if (!isPlaying) {
        bingoMaxNumber = parseInt(newValue);
        
        visibilityOf76To90(newValue == 90);
    }
}


function visibilityOf76To90(isVisible) {
    displaySetting = "none";
    if (isVisible) {
        displaySetting = "inline-block";
    }

    for (i = 75; i < bingoNumbersLabels.length; i++) {
        bingoNumbersLabels[i].style.display = displaySetting;
    }
}


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}
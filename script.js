const buttons = document.querySelectorAll("button");
const prompt = document.querySelector("#prompt");
const playerScore = document.querySelector('#player-score');
const cpuScore = document.querySelector('#cpu-score');
const results = document.querySelector('#results');

buttons.forEach((button) => {
    button.addEventListener('click', playGame);
})

function updateButtonStatus() {
    buttons.forEach((button) => {
        button.classList.toggle("inactive");
    });
}

function playGame(e) {
    let playerChoice = e.currentTarget.getAttribute('id');
    let currentRound = document.querySelector("#round");

    if (prompt.innerText == "Press any button to reset game.") {
        resetGame();
        return;
    }else if (e.currentTarget.classList.contains("inactive")) {
        updateButtonStatus(); 
        prompt.innerText = "";
        document.querySelector("#player-choice").setAttribute("class", "unknown");
        document.querySelector("#cpu-choice").setAttribute("class", "unknown");
        currentRound.innerText = parseInt(currentRound.innerText) + 1;
        return;
    };

    updateButtonStatus();
    prompt.innerText = "Press any button to continue.";

    manageScore(playRound(playerChoice, computerPlay()));    

    if (currentRound.innerText == "5") {
        declareWinner();
    }
}

function computerPlay() {
    let pickNum = Math.floor(Math.random() * 3);

    switch(pickNum) {
        case 0:
          return "rock";
        case 1:
          return "paper";
        case 2:
          return "scissors";
        default:
          return undefined;
    }

}

function playRound(playerSelection, computerSelection) {

    let resultIndicator = document.querySelector('#result-indicator');
    document.querySelector("#player-choice").setAttribute("class", playerSelection);
    document.querySelector("#cpu-choice").setAttribute("class", computerSelection);
    

    if ((playerSelection == 'rock' && computerSelection == 'scissors') || 
        (playerSelection == 'scissors' && computerSelection == 'paper') || 
        (playerSelection == 'paper' && computerSelection == 'rock')) {

            results.innerText = "You Win!!";
            resultIndicator.innerText = ">";
            return "player";

    } else if ((playerSelection == 'paper' && computerSelection == 'scissors') || 
        (playerSelection == 'rock' && computerSelection == 'paper') || 
        (playerSelection == 'scissors' && computerSelection == 'rock')) {

            results.innerText = "CPU Wins!!";
            resultIndicator.innerText = "<";
            return "cpu";

    } else {

        results.innerText = "It's a Draw!!";
        resultIndicator.innerText = "=";
        return undefined;

    }

}

function manageScore(winner) {

    if (winner == "player") {
        playerScore.innerText = parseInt(playerScore.innerText) + 1;
    } else if (winner == "cpu") {
        cpuScore.innerText = parseInt(cpuScore.innerText) + 1;
    }
}

function declareWinner() {
    if (parseInt(playerScore.innerText) > parseInt(cpuScore.innerText)) {
        results.innerText = `GAME OVER! You win ${playerScore.innerText} to ${cpuScore.innerText}!`;
    } else if (parseInt(playerScore.innerText) < parseInt(cpuScore.innerText)) {
        results.innerText = `GAME OVER! You lose ${playerScore.innerText} to ${cpuScore.innerText}!`;
    } else {
        results.innerText = `GAME OVER! You tied ${playerScore.innerText} to ${cpuScore.innerText}!`;
    }
    prompt.innerText = "Press any button to reset game.";

}

function resetGame() {
    playerScore.innerText = 0;
    cpuScore.innerText = 0;
    document.querySelector("#round").innerText = 1;
    results.innerText = "Make your selection to begin!";
    prompt.innerText = "";
    document.querySelector("#player-choice").setAttribute("class", "unknown");
    document.querySelector("#cpu-choice").setAttribute("class", "unknown");
    updateButtonStatus();
}

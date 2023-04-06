/* We store our game status element here to allow us to more easily use it later on */ 
const statusDisplay = document.querySelector('.game--status');
let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

/* We see th initial message to let the players know whose turn it is*/
statusDisplay.innerHTML = currentPlayerTurn();

function handleCellClick(clickedCellEvent){
    /* We save the clicked html element in a variable for easier further use*/
    const clickedCell = clickedCellEvent.target;
    /* We get the 'data-cell-index' attribute from the clicked cell to identify where that cell is in our grid*/
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
    /* We check whether the call has already been played, or if the game is paused. If either is true we ignore the click*/
    if (gameState[clickedCellIndex] !== "" || !gameActive){
        return;
    }
    /* We update our internal game state to reflect the played move, as well as update the user interface to reflect the played move*/
    handleCellPlayed(clickedCell, clickedCellIndex);
    /* We check whether the game has been won, lost, or is a draw*/
    handleResultValidation();
}

function handleCellPlayed(clickedCell, clickedCellIndex){
    /* We update our internal game state to reflect the played move*/
    gameState[clickedCellIndex] = currentPlayer;
    /* We update the user interface to reflect the played move*/
    clickedCell.innerHTML = currentPlayer;
}

const winningConditions = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

function handleResultValidation(){
    let roundWon = false;
    for (let i = 0; i <= 7; i++){
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === ''){
            continue;
        }
        if (a === b && b === c){
            roundWon = true;
            break
        }
    }
    if(roundWon){
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    /* We check whether the game is a draw*/
    let roundDraw = !gameState.includes("");
    if (roundDraw){
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }4
    /* We switch the players*/
    handlePlayerChange();
}

function handlePlayerChange(){
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleRestartGame(){
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);
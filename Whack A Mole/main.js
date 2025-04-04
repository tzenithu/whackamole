let score = 0; //stores the player's score 
let gameCounter =60; //represents the time left on the game, starting at 60 seconds 
let gameTimerInterval = 0;//stores the interval for the game countdown
let moleSpawnerInterval = 0; // stores the interval for mole spawner timer
let gameActive = false; // boolean statement to check if the game is active 
const allowedKeys = ["q", "w", "e", "a", "s", "d", "z", "x", "c"]; //an array of the keys that are accepted by the game 
let moleState = { //object that tracks whether a mole is in each hole using booleans 
    hole1: false,
    hole2: false,
    hole3: false,
    hole4: false,
    hole5: false,
    hole6: false,
    hole7: false,
    hole8: false,
    hole9: false,
}

const holeKeyMap = { //maps keys to their specific hole 
    "q": "hole1",
    "w": "hole2",
    "e": "hole3",
    "a": "hole4",
    "s": "hole5",
    "d": "hole6",
    "z": "hole7",
    "x": "hole8",
    "c": "hole9"
};

function userScores(){ //hides the main menu and reveals the high scores screen 
    displayHighScores();
    document.getElementById("main-menu").style.display = "none";
    document.getElementById("returnButton").style.display = "block";
    document.getElementById("high-scores").style.display = "block";
}

function returnMain(){ //hides the high scores screen and returns to the main menu 
    document.getElementById("main-menu").style.display = "block";
    document.getElementById("returnButton").style.display = "none";
    document.getElementById("high-scores").style.display = "none";
}

function readyGame(){ // hides the main menu and begins the countdown for the game to begin 
    document.getElementById("main-menu").style.display = "none";
    document.getElementById("results-screen").style.display = "none";
    countdown();
}

function exit(){ //exits the game, called by a button on the main screen to exit midway through the game, clearing score and intervals
    score =0; 
    gameActive = false;
    clearInterval(gameTimerInterval);
    clearInterval(moleSpawnerInterval);
    gameCounter = 60;
    document.getElementById("mole-game").style.display = "none";
    document.getElementById("results-screen").style.display = "none";
    document.getElementById("main-menu").style.display = "block";
}

function countdown(){ //starts a countdown from 3, updating the display every second until it hits 0, which then calls the startGame function
    let countdownDisplay = document.getElementById("countdown");
    countdownDisplay.style.display ="block";
    let counter = 3;
    countdownDisplay.innerText = counter; 

    let interval = setInterval(function(){
        counter--;
        countdownDisplay.innerText = counter;
        
        if (counter === 0){
            clearInterval(interval);
            countdownDisplay.style.display = "none";
            document.getElementById("mole-game").style.display = "block";
            startGame();
        }
    }, 1000);
}

function startGame(){ //begins the game, sets the score to 0 and begins the mole-spawning progress. sets the initial spawning timer and the game timer 
    score = 0;  
    document.getElementById("score-display").innerText = "Score: " + score;
    gameActive = true;
    moleSpawner(); 
    clearInterval(moleSpawnerInterval)
    moleSpawnerInterval = setInterval(moleSpawner, 2000); //initially sets moles to spawn ever 2 seconds 
    gameTimer();
}

function gameTimer(){// runs the game timer, decreasing the onscreen counter every second. every 10 seconds, it ramps up the mole spawn rate
    let gameTimerDisplay = document.getElementById("game-timer");
    gameTimerDisplay.innerText = gameCounter;
    clearInterval(gameTimerInterval);
    gameTimerInterval = setInterval(function(){
        gameCounter--;
        gameTimerDisplay.innerText = gameCounter;

        //mole spawn rate is adjusted every 10 seconds 
        if (gameCounter % 10 === 0 && gameCounter > 0) {
            let newSpawnRate = Math.max(2000 - (60 - gameCounter) * 50, 1000); 
            updateMoleSpawnRate(newSpawnRate);
        }
        
        if (gameCounter === 0){
            clearInterval(gameTimerInterval);
            endGame();
        }
    }, 1000);
}

function updateScore(){ //increments the score by 1 and updates the score display on the screen and the final score  
    score ++; 
    document.getElementById("score-display").innerText = "Score: " + score;
    document.getElementById("final-score").innerText = "Your final score was: " + score;
}

function endGame(){ //called when the time runs out, stops the game and clears intervals, then saves the player score and displays the results 
    gameActive = false;
    gameCounter = 60;
    clearInterval(gameTimerInterval);
    clearInterval(moleSpawnerInterval);
    saveHighScore(score); 
    displayHighScores(); 
    document.getElementById("mole-game").style.display = "none";
    document.getElementById("results-screen").style.display = "block";
}

function moleSpawner() { //spawns mole , hides them initially and then randomly selects their holes, showing them briefly. it also adjusts the moles based on the remaining game time 
    if (!gameActive) return;

    //hides all moles and then resets their state 
    document.querySelectorAll(".mole").forEach(mole => mole.style.display = "none");
    Object.keys(moleState).forEach(hole => moleState[hole] = false);

    //determines how many moles to spawn
    let moleCount = 1;
    if (gameCounter <= 30) moleCount = 2;
    if (gameCounter <= 10) moleCount = 3;
    
    //stores randomly selected holes 
    let chosenHoles = new Set(); 

    //keeps adding holes to chosenHoles until there's enough 
    while (chosenHoles.size < moleCount) {
        let holeRandomizer = "hole" + (Math.floor(Math.random() * 9) + 1);
        chosenHoles.add(holeRandomizer);
    }

    //shows the mole in the hole 
    chosenHoles.forEach(holeId => {
        let randomHole = document.getElementById(holeId); //obtains hole id
        if (!randomHole) return;

        let mole = randomHole.querySelector(".mole");//finds the mole and makes it visble 
        if (mole) {
            mole.style.display = "block";
            mole.classList.add("show"); 
            moleState[holeId] = true;

            setTimeout(() => { //removes the mole after 1 seconds 
                mole.classList.remove("show"); 
                mole.style.display = "none";
                moleState[holeId] = false;
            }, 1000);
        }
    });
}

function updateMoleSpawnRate(interval){ //changes the rates at which moles spawn by adjusting the spawn interval 
    clearInterval(moleSpawnerInterval)
    moleSpawnerInterval = setInterval(moleSpawner, interval);
}

document.addEventListener("keydown", function(event) { //when a key is pressed, checks if it's allowed and corresponds to a mole, if so, scores and hides the mole 
    if (!gameActive) return;

    let pressedKey = event.key.toLowerCase();
    if (!allowedKeys.includes(pressedKey)) return;



    let keyElement = document.getElementById("key-" + pressedKey);
    if (keyElement) {
        keyElement.classList.add("key-pressed"); 
    }

    let holeId = holeKeyMap[pressedKey]; //gets the hole directly from mapping

    if (holeId && moleState[holeId]) {
        console.log("Hit!");
        updateScore();
        moleState[holeId] = false; //removes the mole after hit
        document.getElementById(holeId).querySelector(".mole").style.display = "none";
    } else {
        console.log("Miss!");
    }
});

document.addEventListener("keyup", function(event) { //removes key press effect added in the keydown event listener 
    let releasedKey = event.key.toLowerCase();
    let keyElement = document.getElementById("key-" + releasedKey);
    if (keyElement) {
        keyElement.classList.remove("key-pressed"); 
    }
});

function saveHighScore(newScore) { //retrieves existing scores, if none exist it begins with an empty list 
    let highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    //adds the new score 
    highScores.push(newScore);

    //sorts score in descending order, pushing scores that aren't within the top 3 out 
    highScores.sort((a, b) => b - a);
    highScores = highScores.slice(0, 3);

    //saves the resulting scores back to storage 
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

function displayHighScores() { //retrieves the high scores from storage and displays them if they're present 
    let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    let highScoreDisplay = document.getElementById("high-scores");

    if (highScores.length === 0) {
        highScoreDisplay.innerHTML = "No high scores yet!";
    } else {
        highScoreDisplay.innerHTML = "Top Scores:<br>" + highScores.map(function(score) { 
            return score; 
        }).join("<br>");
    }
}

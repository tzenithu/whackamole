# whackamole


This whack-a-mole project is a browser based game for all sorts of players, but is especially beginner friendly.
The main objective is to hit moles that randomly appear on screen by pressing the corresponding keyboard keys, within the 60 second time limit.
The primary goal is to rack up as many points as possible, to reach a high score all whilst contending with the game's increasing difficulty.
This is built via HTML, CSS styling and JavaScript, allowing for a lightweight single page application, easy to pick up and play without downloads.
Featuing a timer, spawning randomly spawning moles and a scoring system that tracks the player's high scores using their browser's localStorage, the game is easily accesible and playable for anyone. It also has a simple, stylised user interface.

The HTML elements of the game allows for easy navigation of the menus, playable in the browser
The CSS is responsible for the unique UI, as well as creating a smooth animation for the moles popping out of the holes, and additionally allows for pressing animations on the buttons and key presses.
The JavaScript dictates the functionality of the game, managing the game logic, timers, mole spawning, scoring systems and localStorage score saving. Additionally, Event listeners are used to detect key presses (keydown, keyup) to detect mole hits and animate the onscreen keys. 
The combination of the three alows for a fully responsive game, that adapts to all screen sizes on any device with a browser. 

   - Key Features -

- Random mole spawning: This allows for moles to spawn randomly with increasing frequency, controlled by holeRandomizer using math.random techniques.
- Keyboard reading: The allowed keys (Q, W, E, A, S, D, Z, X, C) are present on screen and will glow when pressed. pressing the corresponding key when that mole is present (using boolean logic), then "whacks" the mole, updating triggering the mole to vanish and update the score, which sets it apart from mouse based contemporaries.
- High scores: Scores are dynamically updated with each press and reset when the game is exited. If the game is completed, it will check to see if the High score is within the top 3 of the currently saved scores, and if so, it will push it into the list and save it to localStorage - allowing the player to come back and compare whenever they please.
- Timer: Once the ready game button has been pressed, the game begins a countdown using the interval system, dynamically updating for the 3 seconds before the game begins and the game state is set to true. Using the same technique, the actual game has a dynamically updating 60 second timer, which will increase the mole spawning as it decreases. Once the game concludes, the game state will be set to false and scores will be saved - sending players to the results screen.

- Installation -

To play this game, just download this repository and open the html file in any web browser and you will be able to play. 



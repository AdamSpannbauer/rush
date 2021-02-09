# rush

An in browser mini-game rush style game.

## Steps to add a minigame

0. Fork/create a branch to develop your game in
1. Make a copy of [`src/games/miniGameTemplate`](src/games/miniGameTemplate). Make sure you copy this to the `src/games` dir). Rename the resulting directory to reflect your minigame.
2. Rename the class in `src/game/<yourMiniGameName>/miniGameClass.js` to reflect your minigame.
3. Fill out the arguments in the call to `super()`.
   * `name` - the name of your minigame (might appear in menus etc)
   * `instructions` - the instructions that will flash on the screen before your game starts (please be brief)
4. Develop the minigame.
   * DO NOT change anything in `sketch.js` your minigame will be integrated into the arcade by importing the class from `src/game/<yourMiniGameName>/miniGameClass.js`. Your changes in `sketch.js` will not be imported into the overall minigame rush gameplay.  Any changes you make in `sketch.js` will not have any effect on the game play once the game is integrated.
   * For testing, start your server in the `src` directory and navigate to your games directory (i.e. after starting the server in `src` you might navigate to `localhost:8000/games/memoryGame/` if you were testing the game in the `memoryGame` directory).
   * User input can can be found in the `events` attribute of your game class that is subclassed from the `MiniGame` base class
     * Boolean flags in `events`:
       * `this.events.mousePressed` - will be `true` if mouse was pressed this frame
       * `this.events.mouseReleased` - will be `true` if mouse was released this frame
     * Methods available for checking `events`:
       * `this.events.keyWasPressed('a')` - will return `true` if `a` was pressed this frame
       * `this.events.keyWasReleased('a')` - will return `true` if `a` was released this frame
     * Additional info on `events`
       * `this.events.keysPressed` - holds an array of strings listing the keys pressed this frame
       * `this.events.keysReleased` - holds an array of strings listing the keys released this frame
5. Add your mini game to [`src/gamesList.js`](src/gamesList.js).  For the game to be added, you need to add an import statement and add the imported class into the `GAMES_LIST` array.
6. Test the game was integrated as expected.
   * Serve the game from the root directory of the repo
   * Ensure the game appears eventually appears in the overall game and that it behaves as expected.
7. Open up a pull request for review

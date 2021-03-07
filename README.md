# rush

An in browser mini-game rush style game with a focus on open source collaboration.

## How to contribute

### Initial setup

1. Fork this repo.
2. Clone your fork of the repo to have a local copy.
3. `cd` into the cloned repo directory to begin development.
4. Run `npm install -D` to install the dev dependencies of the project ( `eslint` and style guide)
5. Run `chmod +x ./utils.sh` to give execution rights to some utilities for managing mini game files

### Developing a mini game

#### Setup your mini game's files

- Run `./utils.sh new <YourMiniGameName>` (requires `./utils.sh` to have execution rights; see step 5 in Initial setup)
  1.  Replace `<YourMiniGameName>` with your game's name. The name should contain no spaces or symbols and use either camelCase or PascalCase.
  2.  Fill out the arguments in the call to `super()` in `src/game/<yourMiniGameName>/miniGameClass.js`
      - `name` - the name of your minigame (might appear in menus etc)
      - `instructions` - the instructions that will flash on the screen before your game starts (please be brief)
  3.  Fill out the user input(s) that your game requires by setting the respective `this.instructions.inputs` flags to `true`

#### Developing your minigame

- **DO NOT change anything in `sketch.js`**
  - Your minigame will be integrated into the arcade by importing the class from `src/game/<yourMiniGameName>/miniGameClass.js`. Your changes in `sketch.js` will not be imported into the overall minigame rush gameplay. Any changes you make in `sketch.js` will not have any effect on the gameplay once the game is integrated.
- Methods and attributes that are inherited from `MiniGame`
  - **Must** overwritte
    - `draw`
      - This will be run once per frame.
      - Place all of the code for drawing/rendering your gameplay in this method.
    - `update`
      - This will be run once per frame.
      - Place all of the code for updating game state, dealing with user input, and any other non-drawing logic that needs to continuously run for your game to function.
    - `resetGame`
      - This will be run once before each time your game is played.
      - Place everything needed to reset the gameplay of your game. The `constructor` will _not_ be called more than once in the minigame rush, so you can not rely on it to reset your game's state.
      - Attributes that are reset automatically:
        - `this.gameOver = false`
        - `this.gameWon = false`
        - `this.startTime = Date.now()`
  - Do not overwrite
    - `this.events` - for accessing user input; see user input section below
    - `this.maxSeconds` - max number of seconds to complete game; (currently 5 seconds)
    - `this.startTime` - the output of `Date.now()` that will be set on reset
    - `this.secondsElapsed` - the number of seconds that have passed since the game started (float)
    - `this.percentElapsed` - the percentage of time that has passed (`this.secondsElapsed / this.maxSeconds`)
    - `this.resetTime()` - resets the `startTime` to `Date.now()`
  - Overwritable
    - `this.gameOver` - whether or not the game is over because of victory, loss, or timing out. Set to `true` and the game will immediately end.
    - `this.gameWon` - whether or not the game has been won by the user. Set to `true` once the user has won, this attribute will be checked when the game over event has triggered.
- User input

  - User input can be found in the `this.events` attribute of your game class in `src/game/<yourMiniGameName>/sketch.js`
  - Available events:
    - Boolean flags in `events`:
      - `this.events.mousePressed` - will be `true` if mouse was pressed this frame
      - `this.events.mouseReleased` - will be `true` if mouse was released this frame
    - Methods available for checking `events`:
      - `this.events.keyWasPressed('a')` - will return `true` if `a` was pressed this frame
      - `this.events.keyWasReleased('a')` - will return `true` if `a` was released this frame
    - Additional info on `events`
      - `this.events.keysPressed` - holds an array of strings listing the keys pressed this frame
      - `this.events.keysReleased` - holds an array of strings listing the keys released this frame

#### Testing your minigame

- Start a server in the `src` directory
- Open up a web browser and navigate to your game's directory
  - For example, if testing a game in the `memoryGame` directory you might navigate to `localhost:8000/games/memoryGame/`.

#### Finishing up

1. Add your mini game to the games list
   - Add your mini game to the imports in [`src/gamesList.js`](src/gamesList.js).
   - Add the newly imported class into the `GAMES_LIST` array in [`src/gamesList.js`](src/gamesList.js).
2. Test the game was integrated as expected.
   - Start a server in the root of the repo's directory
   - Ensure the game eventually appears in the overall game and that it behaves as expected.
3. Open up a pull request for review

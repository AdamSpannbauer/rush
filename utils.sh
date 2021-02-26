#!/bin/bash

####################################################################

# Before using
# * Give utils.sh execution rights: chmod +x ./utils.sh

# Usage
# * Create new game
#   * with default name: ./utils.sh new
#   * with custom name:  ./utils.sh new dadBall
# * Update mini game sketch templates
#   * ./utils.sh update_templates

####################################################################


# Function for starting a new mini game.
#
# Performs
# * Copying miniGameTemplate directory
# * Renaming of newly copied dir
# * Renaming of class name (in sketch & class)
#
# Details
# * name defaults to "YourMiniGame" if none provided
# * fails if dir with same name already exists
util_new() {
  local game_name=$1
  local dir_name
  local class_name

  # Check if name passed. 
  # If not, set defaults and alert user
  # name has been defaulted and should be updated.
  if [ -z "$game_name" ]; then
    game_name="YourMiniGame"
    dir_name="yourMiniGame"
    class_name="YourMiniGame"
    printf "\nNo name provided. Name defaulting to '%s'." $game_name
    printf "\n\nBe sure to update to your game's name:"
    printf "\n  * Update dir name"
    printf "\n  * Update class name in sketch.js and miniGameClass.js"
    printf "\n  * Update class name in miniGameClass.js\n\n"
  else
    # With user provided name
    # Create class name (upper case first letter)
    # Create dir name (lower case first letter)

    local first_letter="${game_name:0:1}"
    local remaining_name="${game_name:1:${#game_name}}"

    local lower_first_letter
    local upper_first_letter
    upper_first_letter=$(echo $first_letter | tr '[:lower:]' '[:upper:]')
    lower_first_letter=$(echo $first_letter | tr '[:upper:]' '[:lower:]')
    
    dir_name="$lower_first_letter$remaining_name"
    class_name="$upper_first_letter$remaining_name"
  fi

  # Create full path to new dir and exit if dir already exists
  local new_dir_path="./src/games/$dir_name"
  if [ -d "$new_dir_path" ]; then
    printf "\n******* ERROR *******\n"
    printf "\n    A directory with the name '%s' already exists." "$dir_name"
    printf "\n    Try running again with a different name.\n"
    printf "\n    Example command with name provided:\n"
    printf "\n    ./utils.sh new MySuperFunGameName\n"
    printf "\n*********************\n\n"
    exit 1
  fi

  command cp -r ./src/games/miniGameTemplate "$new_dir_path"
  
  # Replace "YourMiniGame" in sketch and class
  # with user provided name
  local new_sketch_file="$new_dir_path/sketch.js"
  local new_class_file="$new_dir_path/miniGameClass.js"
  command sed -i.bak -e "s/YourMiniGame as UserMiniGame/$class_name as UserMiniGame/" -- "$new_sketch_file" && rm -- "$new_sketch_file.bak"
  command sed -i.bak -e "s/YourMiniGame/$class_name/" -- "$new_class_file" && rm -- "$new_class_file.bak"
}


# Function for finding class name in a `miniGameClass.js` file
# 
# Details
# * Looks for line exporting/declaring a class that extends MiniGame
# * echos name of class if found
find_class_name() {
  local re="^export class ([A-Za-z]+) extends MiniGame \{"
  while read -r line ; do 
    if [[ "$line" =~ $re ]]; then 
      echo "${BASH_REMATCH[1]}"
      exit 0
    fi
  done < "$1"
}

# Function for finding class name in a `miniGameClass.js` file
#
# Performs
# * Copies sketch template: `./src/games/miniGameTemplate/sketch.js`
# * Overwrites game sketches with template: `./src/games/*/sketch.js`
# * Corrects class import in newly updated `./src/games/*/sketch.js`
util_update_templates() {
  local templateSketch="./src/games/miniGameTemplate/sketch.js"
  
  for dir in ./src/games/*/
  do
    dir=${dir%*/} 
    local dirSketchFile=$dir"/sketch.js"
    local dirClassFile=$dir"/miniGameClass.js"
    local class_name

    if [ "$dirSketchFile" != "$templateSketch" ]; then
      class_name="$(find_class_name "$dirClassFile")"
      command cp "$templateSketch" "$dirSketchFile"
      command sed -i.bak -e "s/YourMiniGame as UserMiniGame/$class_name as UserMiniGame/" -- "$dirSketchFile" && rm -- "$dirSketchFile.bak"
    fi
  done
}


# Check if valid function name passed
# Run function with remaining args
if declare -f "util_$1" >/dev/null 2>&1; then
  func="util_$1"
  shift
  "$func" "$@"
else
  printf "\nCommand '%s' not recognized" $1
  printf "\n\n Valid commands are:"
  printf "\n  $ ./utils.sh new [gameName]"
  printf "\n  $ ./utils.sh update_templates\n\n"
  exit 1
fi

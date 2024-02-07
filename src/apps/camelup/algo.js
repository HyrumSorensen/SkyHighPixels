const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

//Start Global Variables

let board = 0;
let camels = 0;
let dice = ["red", "green", "yellow", "purple", "blue", "black", "white"];
let rolledDice = [];
let rollCount = 0;


//End Global Variables

class Camel {
  constructor(id, color) {
    this.id = id;
    this.color = color;
    this.position = 0;
    this.below = null;
    this.above = null;
  }
  getTopCamel() {
    let current = this;
    while (current.above) {
      current = current.above;
    }
    return current;
  }

  move(spaces, board) {
    // If there's a camel below the current camel, remove the reference to this camel.
    if (this.below) {
        this.below.above = null;
        this.below = null;
    }

    // Collect all the camels in the moving stack
    let movingCamels = [];
    let camel = this;
    while (camel) {
        movingCamels.unshift(camel); // Add to the beginning to keep the order intact
        board[camel.position] = board[camel.position].filter((c) => c !== camel);
        camel = camel.above;
    }

    // After removal of the moving camels, check if any camel is left in the original position
    if (board[this.position].length > 0) {
        let topRemainingCamel = board[this.position][board[this.position].length - 1];
        topRemainingCamel.above = null; // No camel is above it anymore
    }

    // Determine the movement direction based on the rolled camel
    let isMovingBackward = this.color === "black" || this.color === "white";

    // Calculate the new position
    let newPosition = isMovingBackward
        ? this.position - spaces
        : this.position + spaces;
    let markerLanding = false;

    //Adjust for any markers
    if (board[newPosition].length === 1 && typeof board[newPosition][0] === "string") {
      let word = board[newPosition][0];
      if (word === "help" && isMovingBackward) {
        newPosition = newPosition - 1;
        console.log("black plus")
      } else if (word === "help" && !isMovingBackward) {
        newPosition++;
        console.log("color plus")
      } else if (word === "hurt" && isMovingBackward) {
        newPosition++;
        console.log("black minus")
        markerLanding = true;
      } else if (word === "hurt" && !isMovingBackward) {
        newPosition = newPosition - 1;
        markerLanding = true;
        console.log("color minus")
      }
    }

    // Update position of all moving camels
    movingCamels.forEach((c) => {
        c.position = newPosition;
    });

    // Add the moving camels to the board's track at the new position
    if (board[newPosition].length > 0 && markerLanding) {
        // Place moving camels below existing camels
        let bottomCamelAtSpot = board[newPosition][0];
        movingCamels[movingCamels.length - 1].above = bottomCamelAtSpot;
        bottomCamelAtSpot.below = movingCamels[movingCamels.length - 1];
        board[newPosition] = [...movingCamels, ...board[newPosition]];
    } else {
        // Place the camels in the new position, always on top of any existing camels
        if (board[newPosition].length > 0) {
            let topCamelAtSpot = board[newPosition][board[newPosition].length - 1];
            topCamelAtSpot.above = movingCamels[0];
            movingCamels[0].below = topCamelAtSpot;
        }
        board[newPosition] = [...board[newPosition], ...movingCamels];
    }
}


  
}

class Board {
  constructor() {
    this.track = Array(20)
      .fill(null)
      .map(() => []);
  }

  placeMarker(type, position) {

    if (position < 2 || position > 15) {
      console.log("Sorry you cant place your tile there")
    }
    else if(this.track[position-1].length === 1 && typeof this.track[position-1][0] === "string") {
      console.log("Sorry you cant place your tile there, there is another marker close by")
    }
    else if(this.track[position+1].length === 1 && typeof this.track[position+1][0] === "string") {
      console.log("Sorry you cant place your tile there, there is another marker close by")
    }
    else if (this.track[position].length === 0) {
      this.track[position].push(type)
      console.log(`Placed a ${type} marker at position ${position}`);
    }
    else {
      console.log("sorry you can't place your tile there, there are camels on that space")
    }
  }

  initialPlaceCamel(camel) {
    let position = this.rollDie();

    // Adjust position for black and white camels
    if (camel.color === "black" || camel.color === "white") {
      if (position === 1) {
        position = 16;
      } else if (position === 2) {
        position = 15;
      } else {
        position = 14;
      }
    }

    // If there are already camels in the position, stack the new camel on top
    if (this.track[position].length > 0) {
      const topCamelAtPosition =
        this.track[position][this.track[position].length - 1];
      topCamelAtPosition.above = camel;
      camel.below = topCamelAtPosition;
    }

    // Add camel to the position on the track
    this.track[position].push(camel);
    camel.position = position;
  }

  rollDie() {
    return Math.floor(Math.random() * 3) + 1; // Dice rolls 1, 2, or 3
  }

  placeCamel(camel) {
    let position = this.rollDie();
    camel.move(position, this.track);
    console.log("die rolled: ", camel.color, " ", position);
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function resetDice() {
  dice = ["red", "green", "yellow", "purple", "blue", "black", "white"];
  rolledDice = [];
}


function getLeadingCamel(camels) {
  // Filter out only colored camels (ignoring black and white camels) that have moved from their starting positions
  let movedColoredCamels = camels.filter(camel => 
    (camel.position !== 0) && 
    (["red", "green", "yellow", "purple", "blue"].includes(camel.color))
  );

  // Sort based on the camel's position and stack order
  movedColoredCamels.sort((a, b) => {
    // If the camels are at different positions, sort them based on the position
    if (a.position !== b.position) {
      return b.position - a.position;
    }
    
    // If they are at the same position, compare based on their height in the stack
    let currentCamel = a;
    while (currentCamel) {
        if (currentCamel === b) return 1; // b is below a
        currentCamel = currentCamel.above;
    }
    return -1; // a is below b
  });

  return movedColoredCamels[0];
}


function printCamels(board) {
  // Iterate over each position on the board
  for (let position = 0; position < board.track.length; position++) {
      const itemsAtPosition = board.track[position];
      
      // Filter out any non-camel items (e.g., markers)
      const camelsAtPosition = itemsAtPosition.filter(item => item instanceof Camel);

      if (camelsAtPosition.length > 0) {
          const stack = [];
          let currentCamel = getBottomCamel(camelsAtPosition[0]);

          while (currentCamel) {
              stack.push(currentCamel.color);
              currentCamel = currentCamel.above;
          }

          console.log("Stack:", stack.join(", "), "at position:", position);
      }
  }
}


function getBottomCamel(camel) {
  while (camel.below) {
      camel = camel.below;
  }
  return camel;
}


function InitialSetup() {
  board = new Board();

  resetDice();

  // Define the 5 colored camels
  const colors = ["red", "green", "purple", "yellow", "blue", "black", "white"];
  camels = colors.map((color, index) => new Camel(index, color));

  shuffle(camels);

  // Place each camel on the board
  camels.forEach((camel) => board.initialPlaceCamel(camel));

  return { board, camels }; // returning the board and camels for further operations
}

//begin console inputs

rl.on("line", (line) => {
  const args = line.split(' ');
  if (line === "i") {
    let { board, camels } = InitialSetup();
    console.log("Camels initialized and placed on the board!");

    printCamels(board);
  }

  if (line === "r") {
    // Only proceed if there are dice left to roll
    if (dice.length > 0 && rollCount < 5) {
      rollCount++;
      // 1. Select a random die
      const randomIndex = Math.floor(Math.random() * dice.length);
      const randomDie = dice[randomIndex];

      if (randomDie === "white") {
        rolledDice.push(randomDie);
        rolledDice.push("black");
        dice.splice(dice.indexOf("white"), 1);
        dice.splice(dice.indexOf("black"), 1);
      } else if (randomDie === "black") {
        rolledDice.push(randomDie);
        rolledDice.push("white");
        dice.splice(dice.indexOf("black"), 1);
        dice.splice(dice.indexOf("white"), 1);
      } else {
        rolledDice.push(randomDie);
        dice.splice(randomIndex, 1);
      }

      // 3. Roll the die and update the camel's position
      // Assuming each camel color maps to a camel in the camels array

      const camelToMove = camels.find((camel) => camel.color === randomDie);
      if (camelToMove) {
        board.placeCamel(camelToMove);
      }

      if (camelToMove.position > 15 && camelToMove.color !== "white" && camelToMove.color != "black") {
        console.log(camelToMove.getTopCamel().color, "Won!");
      }
      printCamels(board);
      
    } else {
      console.log("End of the leg!");
      console.log(getLeadingCamel(camels, board).color, "Is Currently in the lead!")
    }
  }

  if (line === "new leg") {
    resetDice();
    rollCount = 0;
  }

  if (args[0] === "placeMarker") {
    const markerType = args[1]; // either "help" or "hurt"
    const position = parseInt(args[2], 10); // position on the board

    if (markerType === "help" || markerType === "hurt") {
      board.placeMarker(markerType, position);
      console.log(`Attempted to place a ${markerType} marker at position ${position}`);
    } else {
      console.log("Invalid marker type. Use 'help' or 'hurt'.");
    }
  }
  if (line === "print board") {
    console.log(board)
  }






  
});


//PLAYER STUFF





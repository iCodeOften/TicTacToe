const winningCombinations = [
  ["topL", "topM", "topR"],
  ["topL", "midL", "botL"],
  ["topM", "midM", "botM"],
  ["topR", "midR", "botR"],
  ["topL", "midM", "botR"],
  ["topR", "midM", "botL"],
  ["midR", "midM", "midR"],
  ["botR", "botM", "botR"],
];
let pArray = [];
let botArray = [];
let choicesAvailable = [];
let player= "";
let bot = "";


//Populates the choicesAvailable array the initial play spaces
const load = () => {
  $('.boxes').each(function(){
    choicesAvailable.push(this.id);
  });
  console.log(choicesAvailable)
};
window.onload = load;

//selects the player's choice
function choiceCircle(){
  $('#colorChoice')
    .empty()
    .append("O");
  player = "<i class='material-icons'>trip_origin</i>";
  bot = "<i class='material-icons'>close</i>";
  console.log(player, bot)
}

function choiceX(){
  $('#colorChoice')
    .empty()
    .append("X");
  player = "<i class='material-icons'>close</i>";
  bot = "<i class='material-icons'>trip_origin</i>";
  console.log(player, bot)
}

//Records the player's move into pArray
$(".boxes").click(function(){
  if (pArray.includes(this.id)){
    return false;
  }
  //checks to see if the players move is available
  else if (choicesAvailable.includes(this.id)){
    pArray.push(this.id);
    //removes move from the choices available
    for (let i = 0; i <choicesAvailable.length; i++ ){
      if (choicesAvailable[i] === this.id ){
        choicesAvailable.splice(i, 1);
      }
    }
    //appends the players choice to the board
    $('#' + this.id).append(player);
    console.log("player array:" + pArray + "\r\n" + "choices available: " + choicesAvailable );
    checkWinner();
    if (checkWinner() === false){
      botMove();
    } else{
      return false;
    }

  }
});

//Records the bot's move
function botMove(){
  //selects a random index from the list of moves available
  let botChoice = choicesAvailable[Math.floor(Math.random()*botArray.length)];
  botArray.push(botChoice);
  for (let i = 0; i <choicesAvailable.length; i++ ){
    if (choicesAvailable[i] === botChoice ){
      choicesAvailable.splice(i, 1);
    }
  }
  $('#' + botChoice).append(bot);
  checkLoser();
}

function checkWinner(){
  for( let i = 0; i < winningCombinations.length; i++ ){
    console.log(winningCombinations[i]);
    if (JSON.stringify(pArray).includes(JSON.stringify(winningCombinations[i]))){
      $("#winner").removeAttr('hidden');
      console.log("Winner");
      return true;
    }
  }
  return false;
}

function checkLoser(){
  for (let i = 0; i < winningCombinations.length; i++){
    if (JSON.stringify(botArray).includes(JSON.stringify(winningCombinations[i]))){
      $("#loser").removeAttr('hidden');
      console.log("loser");
      return false;
    }
  }
}






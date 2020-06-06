////////////////////////////////////////
////////////List of All Cards///////////
////////////////////////////////////////
 const cards = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle", "fa fa-diamond", "fa fa-bomb", "fa fa-leaf", "fa fa-bomb", "fa fa-bolt", "fa fa-bicycle", "fa fa-paper-plane-o", "fa fa-cube"];

////////////////////////////////////////
////////////Query Selectors/////////////
////////////////////////////////////////
var cardsDeck = document.querySelector('.my-deck'); //Cards Deck
var movesChecker = document.querySelector('.moves'); //Moves Counter
var starsRating = document.querySelector('.score-panel .stars'); //Stars Rating
var restartButton = document.querySelector(".restart"); //Restart Button
var minutesPassed = document.querySelector(".minutes"); //Time counter - minutes
var secondsPassed = document.querySelector(".seconds"); //Time counter - seconds
var modalDisplay = document.querySelector('.modal'); //Modal display
var ratingModal = document.querySelector('.ratingModal'); // Modal Rating Display
var movesModal = document.querySelector('.movesModal'); // Modal Moves display
var restartModal = document.querySelector('.restartModal'); //Modal restart button
var secsModal = document.querySelector('.secondsModal'); //Modal seconds 
var minsModal = document.querySelector('.minutesModal'); //Modal minutes 

////////////////////////////////////////
////////////Defining Variables//////////
////////////////////////////////////////
let checkingCards = []; //Empty array to add cards which will be checked
let matchedCards = []; // Empty array to add matched cards
let moves = 1; //Moves variable to start counting the moves, 1 move will be on first set clicked and subsequently move++
let timerWorking = false; //Timer boolean to avoid re-running of time function again and again
let minutes = 0; //minutes variable
let seconds = 0; //seconds variable

////////////////////////////////////////
////////////Displaying cards////////////
////////////////////////////////////////
function createBoard(){
  cardsDeck.innerHTML = ""; 
  var newCardsDeck = document.createElement('ul'); //Creating New Deck
  newCardsDeck.classList.add('deck');
  let shuffledCards = shuffle(cards); //Using Shuffle function to shuffle contents of card array
  for(let i = 0; i<shuffledCards.length; i++){
    const newLi = document.createElement('li');
    newLi.classList.add('card');
    newLi.innerHTML = `<i class="${shuffledCards[i]}"></i>`;
    newCardsDeck.appendChild(newLi); //Attaching cards to UL
    }
  cardsDeck.append(newCardsDeck); //Appending to Html to display
  cardsDeck.addEventListener('click', clickingCard) //Attaching click eventlistner pointing to function 'clickingCard'
}

////////////////////////////////////////
////////////Shuffle Cards///////////////
////////////////////////////////////////
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
      }
    return array;
}


////////////////////////////////////////
////////////Clicking cards//////////////
////////////////////////////////////////
//Setting up event card listner
function clickingCard(e){
    let clickedCard = e.target; //Using target which is clicked by user and assigning to clicked card variable
    if(clickedCard.classList.contains("card") && !clickedCard.classList.contains("open", "show", "matched")) {  //if statement to avoid re-click of opened or matched card
      clickedCard.classList.add('open','show');  //add classlist open and show to clicked card and push it to array 'checkingCards' which was empty
      checkingCards.push(clickedCard);
        if(timerWorking === false){  //Starting timer on clicking of card using 'startTimer function' and assiging the boolean 'timerWorking' to 'true' to avoid the timer running again and again on each click
          startTimer()
          timerWorking = true;
        }
      }
    if(checkingCards.length === 2){ //If the array lenth is 2, i.e. when we click two cards it will count the movesCheck and if statement is used to check they are matched.
      movesCheck();
        if(checkingCards[0].innerHTML === checkingCards[1].innerHTML){
            matched(); //function matched called
          } else{
            checkingCards[0].classList.add('notMatched'); //notMatched class list is just added temporarily to display red color from css on un-matched cards
            checkingCards[1].classList.add('notMatched');
            setTimeout(notMatched, 200); //time delay to see the second card and then call notMatched function
            }
      }
  completion(); //this function is on completion when it satisfies that matched card array has 16 vars added to it.
}

////////////////////////////////////////
////////////Matched cards///////////////
////////////////////////////////////////
function matched(){
  checkingCards[0].classList.add('matched');  //adding classlist 'matched' and pushing it to matchedCards array
  checkingCards[1].classList.add('matched');
  matchedCards.push(checkingCards[0]);
  matchedCards.push(checkingCards[1]);
  checkingCards = [];  //again emptying checkingCards array to make space for next two sets of cards
}

////////////////////////////////////////
////////////UN-Matched cards////////////
////////////////////////////////////////
function notMatched(){ //when unmatched, the cards will again flip 
  checkingCards[0].classList.remove('notMatched'); //removing this will remove red color from unmatched cards
  checkingCards[1].classList.remove('notMatched');
  checkingCards[0].classList.remove('open', 'show'); //removing this flips the card over
  checkingCards[1].classList.remove('open', 'show');
  checkingCards = [];

}


////////////////////////////////////////
////////////Moves Counter///////////////
////////////////////////////////////////
function movesCheck(){ //every click is read and added and shown
  movesChecker.innerHTML = `${moves}  Moves`;
  moves++;
  starsRate(); //Star rating depends on your clicks hence, after the moves counter we call starsRate() function
}

////////////////////////////////////////
////////////Star Rating/////////////////
////////////////////////////////////////
function starsRate(){ //Here we define the star rating for moves
  var listLength = starsRating.children.length;
  if(moves === 24){ //24 moves will reduce one star by deleteing the childNode of starsRating
    for (i = 0; i < listLength; i++) {
      starsRating.removeChild(starsRating.childNodes[0]);
    }
  }else if(moves === 32){ //32 moves will reduce two stars
      starsRating.removeChild(starsRating.childNodes[0]);
    } 
}


////////////////////////////////////////
////////////Create Board////////////////
////////////////////////////////////////
createBoard(); //This function creates the board.


////////////////////////////////////////
////////////Completion//////////////////
////////////////////////////////////////
function completion(){
  if (matchedCards.length === 16){  //if the matched card array is 16 that means all cards have been matched and its time to show modal
    ratingModal.innerHTML = starsRating.innerHTML; //rating for modal is directly using starsRating html
    // const movesM = document.createElement('li');
    movesModal.innerHTML = `${moves} Moves`; //Moves modal will display moves counter
    minsModal.textContent = minutesPassed.textContent; //.textContent takes the content and passes it
    secsModal.textContent = secondsPassed.textContent;
    timerWorking = false; //timerWorking is back to false so as to start timer again on new click
    clearInterval(timeCheck); //time interwal is cleared using clearInterval() javascript function
    seconds = 0; //make seconds variable 0
    minutes = 0; // make minutes variable 0
    secondsPassed.innerText = "00"; //display text for seconds
    minutesPassed.innerText = " 00"; //display text for minutes
    restartModal.addEventListener("click", restart); //Event listner for modal restart button
    modalDisplay.style.display = "block"; //javascript to display modal

  }
}

////////////////////////////////////////
/////////////////Restart////////////////
////////////////////////////////////////
function restart(){
  moves = 1; //the first move will be counted as 1, and then move++ will ensure subsequent moves are added
  movesChecker.innerHTML = `0 Moves`;
  checkCards = []; //empty array on restart
  matchedCards = [];
  timerWorking = false; //timer boolean to false
  clearInterval(timeCheck); //reset timecheck set interval function 
  seconds = 0;
  minutes = 0;
  secondsPassed.innerText = "00";
  minutesPassed.innerText = " 00";
  createBoard(); //board is created
  const newStarLi3 = document.createElement('li'); 
  const newStarLi2 = document.createElement('li');
  newStarLi3.innerHTML = `<i class="fa fa-star"></i>`;
  newStarLi2.innerHTML = `<i class="fa fa-star"></i>`;
  var listLength = starsRating.children.length; //stars which were removed in the last game will be again re-added using if else statement depending on how many stars left
  if(listLength === 2){
      starsRating.append(newStarLi3);
    }else if (listLength === 1){
      starsRating.append(newStarLi2);
      starsRating.append(newStarLi3);
    } 
  modalDisplay.style.display = "none"; //this command removes the modal
}
restartButton.addEventListener("click", restart); //this is an event listener on restart button which calls restart() function defined above

////////////////////////////////////////
////////////Timer///////////////////////
////////////////////////////////////////
function startTimer() {
  seconds++; //immediately when function is called seconds start counting
  timeCheck = setInterval(function () {  //a very imprtant function as it allows us to add a delay of 1 sec on each counter making us calculate time and display
    minutesPassed.innerHTML = ` ${minutes} min `;
    secondsPassed.innerHTML = ` ${seconds} sec`;
    seconds++;
      if (seconds == 60) {
          minutes++; //using only minutes and seconds as time display
          seconds = 0;
        } 
      }, 1000); //a pause of 1sec
}














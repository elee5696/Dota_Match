$(document).ready(initializeApp);

var randomPaths = radomizeCardArr();

var Game = {firstCard: 0, secondCard: null, matches: 0};
var Player = {gold: 0, power: 0, streak: 0, accuracy: 0, totalMatches: 0,
              totalGold: 0, totalAttempts: 0};

function initializeApp() {
  populateCards(radomizeCardArr());
  $('.card').on('click', clickHandler);
  $('.card').mouseenter(playCardHover);
  $('.arrow_container').on('click', menubarHandler);
  $('.modal_button').on('click', function ()
  { $('.win_modal_container').css('display', 'none'); })
  $('.player_stats').on('click', togglePlayerMenu);
  $('.close').on('click',togglePlayerMenu);
}

function clickHandler(event) {
  cardFlip(event);
  winChecker();
}

function togglePlayerMenu() {
  $('.player_stats_container').toggleClass('show');
}

function menubarHandler() {
  $('.menu_container').toggleClass('show');
  $('.arrow_right').toggleClass('rotation');
}

function cardFlip(event) {
  if (($(event.currentTarget).find('.card_inner').hasClass('card_flipped'))
    || $('.card_validation').length >= 2) {
    return;
  } else {
    $(event.currentTarget).find('.card_inner').toggleClass('card_flipped');
    compareCard();
  }
}

function compareCard() {
    if (Game.firstCard) {
    Game.secondCard = Game.firstCard;
    Game.firstCard = $(event.currentTarget);
    isMatch(event);
  } else { Game.firstCard = $(event.currentTarget); }
}

function addGold() {
  playAudio('coins');
  Player.gold += 10;
  Player.totalGold += 10;
  $('.gold_counter').text(Player.gold);
}

function isMatch(event) {
  $(Game.firstCard).find('.card_inner').toggleClass('card_validation');
  $(Game.secondCard).find('.card_inner').toggleClass('card_validation');
    if (!(Game.firstCard.find('.back').css('background-image') ===
    Game.secondCard.find('.back').css('background-image'))) {
    Player.totalAttempts++;
    setTimeout(function () {
      $(Game.firstCard).find('.card_inner').toggleClass('card_flipped');
      $(Game.secondCard).find('.card_inner').toggleClass('card_flipped');
      $(Game.firstCard).find('.card_inner').toggleClass('card_validation');
      $(Game.secondCard).find('.card_inner').toggleClass('card_validation');
      Game.firstCard = 0;
      Game.secondCard = null;
    }, 500);
  } else {
    addGold();
    Game.matches++;
    Player.totalMatches++;
    $(Game.firstCard).find('.card_inner').toggleClass('card_validation');
    $(Game.secondCard).find('.card_inner').toggleClass('card_validation');
    Game.firstCard = 0;
    Game.secondCard = null;
  }
}

function winChecker() {
  if(Game.matches === 12) {
    setTimeout(function () {
      $('.card_inner').removeClass('card_flipped');
    }, 500);
    $('.win_modal_container').css('display', 'flex');
    Game.matches = 0;
  }
}

function populateCards(arr) {
  var i = 1;
  $('.card .back').each(function (index) {
    $(this).css('background-image', 'url(' + arr[i] + ')');
    i++;
  });
}

function radomizeCardArr() {
  var imgPaths = ['assets/img/items/abyssal_blade.png',
    'assets/img/items/aeon_disk.png',
    'assets/img/items/vladmir.png',
    'assets/img/items/wraith_band.png',
    'assets/img/items/stout_shield.png',
    'assets/img/items/soul_ring.png',
    'assets/img/items/silver_edge.png',
    'assets/img/items/skadi.png',
    'assets/img/items/sheepstick.png',
    'assets/img/items/ring_of_basilius_active.png',
    'assets/img/items/radiance.png',
    'assets/img/items/dagon_5.png'];

  var tempArr = imgPaths.concat(imgPaths);
  var reaminingCount = imgPaths.length
  var tempNumber = 0;
  var index = 0;

  while (reaminingCount) {
    index = Math.floor(Math.random() * reaminingCount--);
    tempNumber = tempArr[reaminingCount];
    tempArr[reaminingCount] = tempArr[index];
    tempArr[index] = tempNumber;
  }

  tempArr.unshift(null);
  return tempArr;
}

function playAudio(file) {
  var sound = new Audio('../assets/audio/' + file + '.wav');
  sound.volume = 0.75;
  sound.play();
}

function playCardHover() {
  var sound = new Audio('../assets/audio/card_hover.wav');
  sound.volume = 0.05;
  sound.play();
}

$(document).ready(initializeApp);

var randomPaths = radomizeCardArr();

var Game = {firstCard: 0, secondCard: null, matches: 0};
var Player = {gold: 0, power: 0, streak: 0, accuracy: 0, totalMatches: 0,
              totalGold: 0, totalAttempts: 0};

function initializeApp() {
  populateCards(radomizeCardArr());
  $('.card').on('click', clickHandler);
  $('.card').on('click', playCardClick);
  $('.arrow_container').on('click', menubarHandler);
  $('.modal_button').on('click', function ()
  { $('.win_modal_container').css('display', 'none'); })
  $('.player_stats').on('click', player_stats_open);
  $('.hero_stats').on('click', hero_stats_open);
  $('.close').on('click', closeMenu);
}

function clickHandler(event) {
  cardFlip(event);
  winChecker();
}

function player_stats_open(event) {
  $('.player_stats_content').parent('.stats_container').toggleClass('show');
}

function hero_stats_open(event) {
  $('.hero_stats_content').parent('.stats_container').toggleClass('show');
}

function closeMenu() {
  $(this).closest('.stats_container').toggleClass('show');
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
  playConfirm();
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
      playErrorSound();
      $(Game.firstCard).find('.card_inner').toggleClass('card_flipped');
      $(Game.secondCard).find('.card_inner').toggleClass('card_flipped');
      $(Game.firstCard).find('.card_inner').toggleClass('card_validation');
      $(Game.secondCard).find('.card_inner').toggleClass('card_validation');
      Game.firstCard = 0;
      Game.secondCard = null;
    }, 600);
    } else {
      addGold();
      Game.matches++;
      Player.totalMatches++;
      $(Game.firstCard).find('.card_inner').toggleClass('card_validation');
      $(Game.secondCard).find('.card_inner').toggleClass('card_validation');
      $(Game.firstCard).find('.back').toggleClass('is_matched');
      $(Game.secondCard).find('.back').toggleClass('is_matched');
      Game.firstCard = 0;
      Game.secondCard = null;
  }
}

function winChecker() {
  if(Game.matches === 12) {
    setTimeout(function () {
      $('.win_modal_container').css('display', 'flex');
      $('.card_inner').removeClass('card_flipped');
      $('.back').removeClass('is_matched');
      populateCards(radomizeCardArr());
    }, 500);
    Game.matches = 0;
  }
}

function populateCards(arr) {
  var i = 0;
  $('.card .back').each(function (index) {
    $(this).css('background-image', 'url(' + arr[i] + ')');
    i++;
  });
}

function radomizeCardArr() {
  var imgPaths = [
    'assets/img/items/abyssal_blade.png',
    'assets/img/items/aeon_disk.png',
    'assets/img/items/vladmir.png',
    'assets/img/items/silver_edge.png',
    'assets/img/items/skadi.png',
    'assets/img/items/sheepstick.png',
    'assets/img/items/radiance.png',
    'assets/img/items/dagon_5.png',
    'assets/img/items/armlet.png',
    'assets/img/items/assault.png',
    'assets/img/items/bfury.png',
    'assets/img/items/black_king_bar.png',
    'assets/img/items/butterfly.png',
    'assets/img/items/crimson_guard.png',
    'assets/img/items/desolator.png',
    'assets/img/items/diffusal_blade_2.png',
    'assets/img/items/ethereal_blade.png',
    'assets/img/items/force_staff.png',
    'assets/img/items/glimmer_cape.png',
    'assets/img/items/guardian_greaves.png',
    'assets/img/items/hand_of_midas.png',
    'assets/img/items/heart.png',
    'assets/img/items/heavens_halberd.png',
    'assets/img/items/helm_of_the_dominator.png',
    'assets/img/items/hurricane_pike.png',
    'assets/img/items/lotus_orb.png',
    'assets/img/items/meteor_hammer.png',
    'assets/img/items/moon_shard.png',
    'assets/img/items/necronomicon_3.png',
    'assets/img/items/nullifier.png',
    'assets/img/items/rapier.png',
    'assets/img/items/refresher.png',
    'assets/img/items/sange_and_yasha.png',
    'assets/img/items/satanic.png',
    'assets/img/items/shivas_guard.png',
    'assets/img/items/sphere.png'];

  var randomArr = shuffleDeck(imgPaths);
  randomArr = shuffleDeck(randomArr.slice(0,12));

  randomArr = randomArr.concat(randomArr);
  randomArr = shuffleDeck(randomArr);

  return randomArr;
}

function shuffleDeck(arr) {
  var rand, temp, i;

  for (i = arr.length - 1; i > 0; i -= 1) {
    rand = Math.floor((i + 1) * Math.random());
    temp = arr[rand];
    arr[rand] = arr[i];
    arr[i] = temp;
  }

  return arr;
}

function playAudio(file) {
  var sound = new Audio('../assets/audio/' + file );
  sound.volume = 0.75;
  sound.play();
}

function playCardClick() {
  var sound = new Audio('../assets/audio/card_hover.wav');
  sound.volume = 0.05;
  sound.play();
}

function playErrorSound() {
  var errorArr =
    ['error.mp3',
    'quack.mp3',];
    var random = Math.floor((Math.random() * errorArr.length));
    playAudio(errorArr[random]);
}

function playConfirm() {
  var confirmArr =
    ['coins.wav',
    'confirm.mp3',];
  var random = Math.floor((Math.random() * confirmArr.length));
  playAudio(confirmArr[random]);
}

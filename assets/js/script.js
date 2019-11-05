$(document).ready(initializeApp);

var randomPaths = radomizeCardArr();

var Game = {firstCard: 0, secondCard: null, matches: 0};
var Player = {gold: 0, totalGold: 0, power: 0, streak: 0, accuracy: 0, totalMatches: 0,
              totalAttempts: 0, gamesWon: 0, badges: []};

function initializeApp() {
  populateCards(radomizeCardArr());
  $('.card').on('click', clickHandler);
  $('.card').on('click', playCardClick);
  $('.arrow_container').on('click', menubarHandler);
  $('.modal_button').on('click', function ()
  { $('.win_modal_container').css('display', 'none'); })
  $('.player_stats').on('click', playerStatsOpen);
  $('.hero_stats').on('click', heroStatsOpen);
  $('.shop_menu_bar').on('click', shopStatsOpen);
  $('.close').on('click', closeMenu);
  $('.shop_start_button').on('click', addPlayerBadges);
}

function clickHandler(event) {
  cardFlip(event);
  winChecker();
}

function playerStatsOpen(event) {
  var stat = $('.player_stats_box');
  Player.accuracy = (( Player.totalMatches / Player.totalAttempts ) * 100).toFixed(2);
  $('.player_stats_content').parent('.stats_container').toggleClass('show');
  stat.find('.games_won_stat').text(Player.gamesWon);
  stat.find('.gold_stat').text(Player.totalGold);
  stat.find('.match_stat').text(Player.totalMatches);
  stat.find('.attempts_stat').text(Player.totalAttempts);
  if(isNaN(Player.accuracy)) {
    stat.find('.acc_stat').text('0%');
  } else {
    stat.find('.acc_stat').text(Player.accuracy);
  }
}

function heroStatsOpen(event) {
  $('.hero_stats_content').parent('.stats_container').toggleClass('show');
}

function shopStatsOpen(event) {
  $('.shop_stats_content').parent('.stats_container').toggleClass('show');
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
      $('.card_inner').toggleClass('reset_board');
      populateCards(radomizeCardArr());
      setTimeout(function ()
       { $('.card_inner').toggleClass('reset_board');}, 2000);
    }, 200);
    Game.matches = 0;
    Game.gamesWon++;
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
    ['error.mp3'];
    var random = Math.floor((Math.random() * errorArr.length));
    playAudio(errorArr[random]);
}

function playConfirm() {
  var confirmArr =
    ['coins.wav'];
  var random = Math.floor((Math.random() * confirmArr.length));
  playAudio(confirmArr[random]);
}

function addPlayerBadges() {

  if(Player.gold >= 50) {
    if(badgeList.length) {
      var random = Math.floor((Math.random() * badgeList.length));
      Player.badges.push(badgeList[random]);
      var wonBadge = badgeList[random];
      badgeList.splice(random, 1);
      playAudio('confirm.mp3');
      $('.shop_screen_image').css('background-image', 'url(' + wonBadge + ')');
      populateBadges();
      Player.gold = Player.gold - 50;
      $('.gold_counter').text(Player.gold);
    } else {
      console.log('Out of badges');
    }
  } else {
    playAudio('quack.mp3');
    console.log("Not enough gold!");
  }
}

function populateBadges() {

  var badge = $('.player_stats_badge_container');

  badge.empty();

  if (Player.badges.length) {
    for (var keys of Player.badges) {
      badge.append('<img src="' + keys + '">');
    }
  }

}

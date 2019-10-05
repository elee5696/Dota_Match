$(document).ready(initializeApp);

var randomPaths = radomizeCardArr();

var Game = {firstCard: 0, secondCard: null, matches: 0};
var Player = {gold: 1000000, totalGold: 0, power: 0, streak: 0, accuracy: 0, totalMatches: 0,
              totalAttempts: 0, badges: []};

var badgeList = [
  'assets/img/miniheroes/abaddon.png',
  'assets/img/miniheroes/abyssal_underlord.png',
  'assets/img/miniheroes/alchemist.png',
  'assets/img/miniheroes/ancient_apparition.png',
  'assets/img/miniheroes/antimage.png',
  'assets/img/miniheroes/arc_warden.png',
  'assets/img/miniheroes/axe.png',
  'assets/img/miniheroes/bane.png',
  'assets/img/miniheroes/batrider.png',
  'assets/img/miniheroes/beastmaster.png',
  'assets/img/miniheroes/bloodseeker.png',
  'assets/img/miniheroes/bounty_hunter.png',
  'assets/img/miniheroes/brewmaster.png',
  'assets/img/miniheroes/bristleback.png',
  'assets/img/miniheroes/broodmother.png',
  'assets/img/miniheroes/centaur.png',
  'assets/img/miniheroes/chaos_knight.png',
  'assets/img/miniheroes/chen.png',
  'assets/img/miniheroes/clinkz.png',
  'assets/img/miniheroes/crystal_maiden.png',
  'assets/img/miniheroes/dark_seer.png',
  'assets/img/miniheroes/dark_willow.png',
  'assets/img/miniheroes/dazzle.png',
  'assets/img/miniheroes/death_prophet.png',
  'assets/img/miniheroes/disruptor.png',
  'assets/img/miniheroes/doom_bringer.png',
  'assets/img/miniheroes/dragon_knight.png',
  'assets/img/miniheroes/drow_ranger.png',
  'assets/img/miniheroes/earth_spirit.png',
  'assets/img/miniheroes/earthshaker.png',
  'assets/img/miniheroes/elder_titan.png',
  'assets/img/miniheroes/ember_spirit.png',
  'assets/img/miniheroes/enchantress.png',
  'assets/img/miniheroes/enigma.png',
  'assets/img/miniheroes/faceless_void.png',
  'assets/img/miniheroes/furion.png',
  'assets/img/miniheroes/grimstroke.png',
  'assets/img/miniheroes/gyrocopter.png',
  'assets/img/miniheroes/huskar.png',
  'assets/img/miniheroes/invoker.png',
  'assets/img/miniheroes/jakiro.png',
  'assets/img/miniheroes/juggernaut.png',
  'assets/img/miniheroes/keeper_of_the_light.png',
  'assets/img/miniheroes/kunkka.png',
  'assets/img/miniheroes/lanaya.png',
  'assets/img/miniheroes/legion_commander.png',
  'assets/img/miniheroes/leshrac.png',
  'assets/img/miniheroes/lich.png',
  'assets/img/miniheroes/life_stealer.png',
  'assets/img/miniheroes/lina.png',
  'assets/img/miniheroes/lion.png',
  'assets/img/miniheroes/lone_druid.png',
  'assets/img/miniheroes/luna.png',
  'assets/img/miniheroes/lycan.png',
  'assets/img/miniheroes/magnataur.png',
  'assets/img/miniheroes/medusa.png',
  'assets/img/miniheroes/meepo.png',
  'assets/img/miniheroes/mirana.png',
  'assets/img/miniheroes/monkey_king.png',
  'assets/img/miniheroes/morphling.png',
  'assets/img/miniheroes/naga_siren.png',
  'assets/img/miniheroes/necrolyte.png',
  'assets/img/miniheroes/nevermore.png',
  'assets/img/miniheroes/night_stalker.png',
  'assets/img/miniheroes/nyx_assassin.png',
  'assets/img/miniheroes/obsidian_destroyer.png',
  'assets/img/miniheroes/ogre_magi.png',
  'assets/img/miniheroes/omniknight.png',
  'assets/img/miniheroes/oracle.png',
  'assets/img/miniheroes/pangolier.png',
  'assets/img/miniheroes/phantom_assassin.png',
  'assets/img/miniheroes/phantom_lancer.png',
  'assets/img/miniheroes/phoenix.png',
  'assets/img/miniheroes/puck.png',
  'assets/img/miniheroes/pudge.png',
  'assets/img/miniheroes/pugna.png',
  'assets/img/miniheroes/queenofpain.png',
  'assets/img/miniheroes/rattletrap.png',
  'assets/img/miniheroes/razor.png',
  'assets/img/miniheroes/riki.png',
  'assets/img/miniheroes/rubick.png',
  'assets/img/miniheroes/sand_king.png',
  'assets/img/miniheroes/shadow_demon.png',
  'assets/img/miniheroes/shadow_shaman.png',
  'assets/img/miniheroes/shredder.png',
  'assets/img/miniheroes/silencer.png',
  'assets/img/miniheroes/skywrath_mage.png',
  'assets/img/miniheroes/slardar.png',
  'assets/img/miniheroes/sniper.png',
  'assets/img/miniheroes/slark.png',
  'assets/img/miniheroes/spectre.png',
  'assets/img/miniheroes/spirit_breaker.png',
  'assets/img/miniheroes/storm_spirit.png',
  'assets/img/miniheroes/sven.png',
  'assets/img/miniheroes/techies.png',
  'assets/img/miniheroes/terrorblade.png',
  'assets/img/miniheroes/tidehunter.png',
  'assets/img/miniheroes/tinker.png',
  'assets/img/miniheroes/tiny.png',
  'assets/img/miniheroes/treant.png',
  'assets/img/miniheroes/troll_warlord.png',
  'assets/img/miniheroes/tusk.png',
  'assets/img/miniheroes/undying.png',
  'assets/img/miniheroes/ursa.png',
  'assets/img/miniheroes/vengefulspirit.png',
  'assets/img/miniheroes/venomancer.png',
  'assets/img/miniheroes/viper.png',
  'assets/img/miniheroes/visage.png',
  'assets/img/miniheroes/warlock.png',
  'assets/img/miniheroes/weaver.png',
  'assets/img/miniheroes/windrunner.png',
  'assets/img/miniheroes/winter_wyvern.png',
  'assets/img/miniheroes/wisp.png',
  'assets/img/miniheroes/witch_doctor.png',
  'assets/img/miniheroes/zuus.png'];


function initializeApp() {
  populateCards(radomizeCardArr());
  $('.card').on('click', clickHandler);
  $('.card').on('click', playCardClick);
  $('.arrow_container').on('click', menubarHandler);
  $('.modal_button').on('click', function ()
  { $('.win_modal_container').css('display', 'none'); })
  $('.player_stats').on('click', player_stats_open);
  $('.hero_stats').on('click', hero_stats_open);
  $('.shop_menu_bar').on('click', shop_stats_open);
  $('.close').on('click', closeMenu);
  $('.shop_start_button').on('click', addPlayerBadges);
}

function clickHandler(event) {
  cardFlip(event);
  winChecker();
}

function player_stats_open(event) {
  var stat = $('.player_stats_box');
  Player.accuracy = (( Player.totalMatches / Player.totalAttempts ) * 100).toFixed(2);
  $('.player_stats_content').parent('.stats_container').toggleClass('show');
  stat.find('.gold_stat').text(Player.totalGold);
  stat.find('.match_stat').text(Player.totalMatches);
  stat.find('.attempts_stat').text(Player.totalAttempts);
  stat.find('.acc_stat').text(Player.accuracy);
}

function hero_stats_open(event) {
  $('.hero_stats_content').parent('.stats_container').toggleClass('show');
}

function shop_stats_open(event) {
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
    for (keys of Player.badges) {
      badge.append('<img src="' + keys + '">');
    }
  }

}

Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)]
}

PLAYERS = {
  NIL:    '',
  RED:    'Red',
  BLUE:   'Blue',
  GREEN:  'Green',
  VIOLET: 'Violet'
}

PLAYER_IDs = {};
PLAYER_IDs[PLAYERS.RED]    = 0;
PLAYER_IDs[PLAYERS.BLUE]   = 1;
PLAYER_IDs[PLAYERS.GREEN]  = 2;
PLAYER_IDs[PLAYERS.VIOLET] = 3;

/*
 * =====================
 * | Live Free or Dice |
 * ---------------------
 * written by Darren Torpey & Greg Kinneman
 * 9/22/12
 * BostonFIG Adobe Game Jam - www.bostonfig.com
*/

/* *******************
  Zone
    An area you control
*/
var Zone = Klass.extend({
  init: function(params) {
    _.defaults(params, {
      x:     0,
      y:     0,
      power: 1,
      owner: PLAYERS.NIL,
    })

    this.x     = params.x,
    this.y     = params.y,
    this.power = params.power,
    this.owner = params.owner;
  },

  quickview: function() {
    return '||' + this.owner + ' (P:' + this.power + ')' + ' [' + this.x + ', ' + this.y + ']' + '||';
  },

  // Attack this zone with the given attacker
  // Returns: whether the attack was successful
  attackWith: function(attacker) {
    notice('-----');
    notice(attacker.quickview() + ' attacks ' + this.quickview());

    debug('Attacker: ' + attacker.quickview());
    debug('Defender: ' + this.quickview());

    var attackerTotal = attacker.rollUp();
    debug('Attacker rolls: ' + attackerTotal);
    var defenderTotal = this.rollUp();
    debug('Defender rolls: ' + defenderTotal);

    var victory = attackerTotal > defenderTotal;
    if (victory) {
      notice('Attacker wins!');
      this.processInvasion(attacker);
    } else {
      notice('Defender wins!');
      this.processFailedAttack(attacker);
    }
    debug('Attacker: ' + attacker.quickview());
    debug('Defender: ' + this.quickview());
  },

  processInvasion: function(attacker) {
    this.owner = attacker.owner;
    this.power = attacker.power - 1;
    attacker.power = 1;
    this.updateView();
    attacker.updateView();
  },

  processFailedAttack: function(attacker) {
    attacker.power = 1;
    this.updateView();
    attacker.updateView();
  },

  updateView: function() {
		PS.BeadColor(this.x, this.y, GLOBALS.teamColors[this.teamColorIndex()]);
		PS.BeadGlyphColor(this.x, this.y, PS.COLOR_BLACK);
    var unitStrengthStrings = ['1','1','2','3'];
		PS.BeadGlyph(this.x, this.y, this.power.toString());
  },

  teamColorIndex: function() {
    return PLAYER_IDs[this.owner];
  },

  rollUp: function() {
    var totalRoll = 0;
    _(this.power).times(function() {
      // console.log(i);
      var roll = [1,2,3,4,5,6].randomElement();
      totalRoll += roll;
    });
    // for (var i = 0; i < attacker.power; i++) {
    //   console.log(i);
    //   var roll = 1;
    // }
    // var totalRoll = _(attacker.power).reduce(function(memo, num) {
    //   console.log(i);
    //   var roll = [1,2,3,4,5,6].randomElement();
    // });
    return totalRoll;
  }
});

var GameBoard = Klass.extend({
  init: function(params) {
    _.defaults(params, {
    })

    this.tile_width  = params.width;
    this.tile_height = params.height;
  },

  // Get all of a player's tiles
  // player: a PLAYERS constant
  getPlayerTiles: function(player) {
    var zones = [];
    for (var x = 0; x < this.tile_width; x++) {
      for (var y = 0; y < this.tile_height; y++) {
        var zone = PS.BeadData(x, y);
        if (zone.owner == player) {
          zones.push(zone);
        }
      }
    }
    return zones;
  }
});

notices_on     = false;
full_debugging = false;

notice = function(message) {
  if (notices_on) {
    console.log(message);
  }
}

debug = function(message) {
  if (full_debugging) {
    console.log(message);
  }
}
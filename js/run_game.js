function game_code_test() {
  window.zones = [];

  // _(4).times(function() {
  //   zones.push(new Zone({ x: 1, y: 1, power: 2, owner: PLAYERS.BLUE }));
  // });
  // Generate a fake board
  zones.push(new Zone({ x: 1, y: 1, power: 2, owner: PLAYERS.BLUE }));
  zones.push(new Zone({ x: 1, y: 2, power: 1, owner: PLAYERS.BLUE }));
  zones.push(new Zone({ x: 2, y: 2, power: 1, owner: PLAYERS.GREEN }));
  zones.push(new Zone({ x: 1, y: 3, power: 4, owner: PLAYERS.RED }));

  // Simulate attacks
  setTimeout(function() {
    zones[2].attackWith(zones[1]);
  }, 750);
  setTimeout(function() {
    zones[1].attackWith(zones[3]);
  }, 1500);
  setTimeout(function() {
    zones[0].attackWith(zones[2]);
  }, 2250);  
}

function initializeRandomBoard() {

	//Generate team colors
	var teamColors = [PS.COLOR_RED, PS.COLOR_BLUE, PS.COLOR_GREEN, PS.COLOR_VIOLET];
	
	//Generate a list of a strengths of units {1,1,2,3,...}
	var unitStrengths = [1,1,2,3];
	var unitStrengthStrings = ['1','1','2','3'];
	
	//Generate a list of all board positions
	var boardPositions = [];
	var counter = 0;
	for (var i = 0 ; i < GLOBALS.boardHeight; i++)
	{
		for (var j = 0; j < GLOBALS.boardWidth; j++)
		{
			var num = i * GLOBALS.boardWidth + j;
			boardPositions[num] = {x:j,y:i};
		}
	}

	//Scramble that list
	boardPositions = _.shuffle(boardPositions);

	//Generate 4 teams with random areas
	var numberOfTiles = GLOBALS.boardHeight * GLOBALS.boardWidth;
	var strengthIndex = 0;
	var colorIndex = 0;
	for (var i = 0; i < numberOfTiles; i++) {
		var x = boardPositions[i].x;
		var y = boardPositions[i].y;
		PS.BeadColor(x, y, teamColors[colorIndex]);
		PS.BeadGlyphColor(x, y, PS.COLOR_BLACK);
		PS.BeadGlyph(x,y,unitStrengthStrings[strengthIndex]);
		var data = {};
		data.strength = unitStrengths[strengthIndex];
		PS.BeadData(x, y, data);

		colorIndex++;
		if (colorIndex > 3) {
			colorIndex = 0;
			strengthIndex++;
			if (strengthIndex > 3) {
				strengthIndex = 0;
			}
		}
	}
}
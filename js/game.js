// game.js for Perlenspiel 2.1

/*
Perlenspiel is a scheme by Professor Moriarty (bmoriarty@wpi.edu).
Perlenspiel is Copyright © 2009-12 Worcester Polytechnic Institute.
This file is part of Perlenspiel.

Perlenspiel is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Perlenspiel is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Lesser General Public License for more details.

You may have received a copy of the GNU Lesser General Public License
along with Perlenspiel. If not, see <http://www.gnu.org/licenses/>.
*/

// This is a template for creating new Perlenspiel games
// All of the functions below MUST exist, or the engine will stop and complain!

// The following comment line is for JSLint. Don't remove it!

/*global PS */

// PS.Init ()
// Initializes the game
// This function normally includes a call to PS.GridSize (x, y)
// where x and y are the desired dimensions of the grid
window.GLOBALS = {
	boardHeight : 4,
	boardWidth : 8,
	currentPlayer : 0,
	teamColors : [PS.COLOR_RED, PS.COLOR_BLUE, PS.COLOR_GREEN, PS.COLOR_VIOLET],
	PLAYERS_ORDERED : [PLAYERS.RED, PLAYERS.BLUE, PLAYERS.GREEN, PLAYERS.VIOLET]
};

PS.Init = function ()
{
	"use strict";

	// change to the dimensions you want

	PS.GridSize ( GLOBALS.boardWidth, GLOBALS.boardHeight ); 
	PS.GridBGColor(PS.COLOR_WHITE);
	
	initializeRandomBoard();

    // Put any other init code here
};

// PS.Click (x, y, data)
// This function is called whenever a bead is clicked
// It doesn't have to do anything
// x = the x-position of the bead on the grid
// y = the y-position of the bead on the grid
// data = the data value associated with this bead, 0 if none has been set

PS.Click = function (x, y, data)
{
	"use strict";
	
	if (data != 0)
	{
		var strength = data.strength;
		if (GLOBALS.teamColors[currentPlayer] == PS.BeadColor(x,y) )
		{
			if (strength > 1)
			{
				//Deselect current
				if (GLOBALS.select != null)
				{
					PS.BeadBorderWidth(GLOBALS.select.x,GLOBALS.select.y,1);
					PS.BeadBorderColor(GLOBALS.select.x,GLOBALS.select.y,PS.COLOR_GRAY);
				}
				
				//Select
				GLOBALS.select = {x:x,y:y};
				PS.BeadBorderWidth(x,y,2);
				PS.BeadBorderColor(x,y,PS.COLOR_WHITE);
			}
		} else {
			//Enemy square
			if (GLOBALS.select != null)
			{
				if (GLOBALS.select.x == x)
				{
					if (GLOBALS.select.y == y + 1 || GLOBALS.select.y == y - 1)
					{
						//ATTACK
					}
				}
				if (GLOBALS.select.y == y)
				{
					if (GLOBALS.select.x == x + 1 || GLOBALS.select.x == x - 1)
					{
						//ATTACK
					}
				}
			}
		}
	}
	//If current player == current color of bead && strength > 1
		//select square
	//If square selected && enemy square
		//Is adjacent
			//Attack
	
};

// PS.Release (x, y, data)
// This function is called whenever a mouse button is released over a bead
// It doesn't have to do anything
// x = the x-position of the bead on the grid
// y = the y-position of the bead on the grid
// data = the data value associated with this bead, 0 if none has been set

PS.Release = function (x, y, data)
{
	"use strict";

	// Put code here for when the mouse button is released over a bead	
};

// PS.Enter (x, y, button, data)
// This function is called whenever the mouse moves over a bead
// It doesn't have to do anything
// x = the x-position of the bead on the grid
// y = the y-position of the bead on the grid
// data = the data value associated with this bead, 0 if none has been set

PS.Enter = function (x, y, data)
{
	"use strict";

	// Put code here for when the mouse enters a bead	
};

// PS.Leave (x, y, data)
// This function is called whenever the mouse moves away from a bead
// It doesn't have to do anything
// x = the x-position of the bead on the grid
// y = the y-position of the bead on the grid
// data = the data value associated with this bead, 0 if none has been set

PS.Leave = function (x, y, data)
{
	"use strict";

	// Put code here for when the mouse leaves a bead	
};

// PS.KeyDown (key, shift, ctrl)
// This function is called whenever a key on the keyboard is pressed
// It doesn't have to do anything
// key = the ASCII code of the pressed key, or one of the following constants:
// Arrow keys = PS.ARROW_UP, PS.ARROW_DOWN, PS.ARROW_LEFT, PS.ARROW_RIGHT
// Function keys = PS.F1 through PS.F1
// shift = true if shift key is held down, false otherwise
// ctrl = true if control key is held down, false otherwise

PS.KeyDown = function (key, shift, ctrl)
{
	"use strict";

	// Put code here for when a key is pressed	
};

// PS.KeyUp (key, shift, ctrl)
// This function is called whenever a key on the keyboard is released
// It doesn't have to do anything
// key = the ASCII code of the pressed key, or one of the following constants:
// Arrow keys = PS.ARROW_UP, PS.ARROW_DOWN, PS.ARROW_LEFT, PS.ARROW_RIGHT
// Function keys = PS.F1 through PS.F12
// shift = true if shift key is held down, false otherwise
// ctrl = true if control key is held down, false otherwise

PS.KeyUp = function (key, shift, ctrl)
{
	"use strict";
	
	// Put code here for when a key is released	
};

// PS.Wheel (dir)
// This function is called whenever the mouse wheel moves forward or backward
// It doesn't have to do anything
// dir = PS.FORWARD if mouse wheel moves forward, PS.BACKWARD if backward

PS.Wheel = function (dir)
{
	"use strict";

	// Put code here for when mouse wheel is moved
};

// PS.Tick ()
// This function is called on every clock tick
// if a timer has been activated with a call to PS.Timer()
// It doesn't have to do anything

PS.Tick = function ()
{
	"use strict";

	// Put code here to handle clock ticks
};

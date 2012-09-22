window.zones = [];

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

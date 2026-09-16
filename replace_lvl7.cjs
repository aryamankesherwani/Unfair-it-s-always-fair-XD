const fs = require('fs');
let code = fs.readFileSync('src/game.html', 'utf-8');

const startStr = `        // -------------------------------------------------------------
        // LEVEL 7: The Bouncing Ceiling Bridge
        // -------------------------------------------------------------
        else if (curLevel === 7) {`;

const endStr = `          const goal = { x: 720, y: 338, w: 32, h: 32 };
          if (checkCollision(player, goal)) advanceLevel();
        }`;

const replacement = `        // -------------------------------------------------------------
        // LEVEL 7: The Death Elevator
        // -------------------------------------------------------------
        else if (curLevel === 7) {
          solids.push({ x: 0, y: 370, w: 200, h: 80 }); // Start ground
          solids.push({ x: 300, y: 150, w: 500, h: 300 }); // Massive right wall/ledge

          // Ceiling spikes for the elevator shaft
          killers.push({ x: 200, y: 0, w: 100, h: 32, dir: 'down' });

          // Spikes on the right ledge to make it look like a real challenge
          killers.push({ x: 300, y: 118, w: 80, h: 32, dir: 'up' });

          // The Elevator logic
          if (!lvlState.lvl7ElevatorTriggered && player.x > 190 && player.x < 300 && player.y + player.h >= lvlState.lvl7ElevatorY) {
              lvlState.lvl7ElevatorTriggered = true;
              playSfx('trap');
          }

          if (lvlState.lvl7ElevatorTriggered) {
              if (lvlState.lvl7ElevatorY > -50) lvlState.lvl7ElevatorY -= 3.5;
          }

          // The Elevator itself
          solids.push({ x: 200, y: lvlState.lvl7ElevatorY, w: 100, h: 20 });

          // Bottom floor of the elevator shaft
          solids.push({ x: 200, y: 430, w: 100, h: 20 });

          const fakeGoal = { x: 440, y: 118, w: 32, h: 32 };
          if (checkCollision(player, fakeGoal)) {
              killPlayer("ELEVATORS ARE FOR LAZY PEOPLE!");
          }

          const realGoal = { x: 234, y: 398, w: 32, h: 32 };
          if (checkCollision(player, realGoal)) {
              advanceLevel();
          }
        }`;

let startIdx = code.indexOf(startStr);
let endIdx = code.indexOf(endStr, startIdx);
if(startIdx !== -1 && endIdx !== -1) {
    code = code.substring(0, startIdx) + replacement + code.substring(endIdx + endStr.length);
    fs.writeFileSync('src/game.html', code);
    console.log("Logic replaced");
} else {
    console.log("Could not find boundaries");
}

const fs = require('fs');
let code = fs.readFileSync('src/game.html', 'utf-8');

const startStr = `        // -------------------------------------------------------------
        // LEVEL 9: The Screen Wrap Troll (3 Bait Platforms + Secret Screen Wrap)
        // -------------------------------------------------------------
        else if (curLevel === 9) {`;

const endStr = `        // -------------------------------------------------------------
        // LEVEL 10: The Hologram Pit (Fake Spikes & Hidden Lower Tunnel)`;

const replacement = `        // -------------------------------------------------------------
        // LEVEL 9: The Fading Slow Goal
        // -------------------------------------------------------------
        else if (curLevel === 9) {
          solids.push({ x: 0, y: 370, w: 150, h: 80 }); // Start ledge
          solids.push({ x: 690, y: 370, w: 200, h: 80 }); // Goal ledge
          killers.push({ x: 150, y: 418, w: 540, h: 32 }); // Spike pit

          // Safe platforms to jump across
          solids.push({ x: 230, y: 310, w: 70, h: 18 });
          solids.push({ x: 380, y: 270, w: 70, h: 18 });
          solids.push({ x: 530, y: 310, w: 70, h: 18 });

          // Start the timer when the player moves right
          if (player.x > 80 && !lvlState.lvl9GoalRunning) {
              lvlState.lvl9GoalRunning = true; // reusing state variable name but for the fade trigger
              lvlState.lvl9GoalAlpha = 1.0;
              playSfx('trap');
              popupTexts.push({
                text: "HURRY! THE GOAL IS FADING!",
                x: 400,
                y: 150,
                color: '#facc15',
                alpha: 1,
                vy: -0.8
              });
          }

          if (lvlState.lvl9GoalRunning) {
              if (lvlState.lvl9GoalAlpha === undefined) lvlState.lvl9GoalAlpha = 1.0;
              lvlState.lvl9GoalX += 0.35; // moves very slowly
              lvlState.lvl9GoalAlpha -= 0.0038; // slowly fades

              if (lvlState.lvl9GoalAlpha < 0) {
                  lvlState.lvl9GoalAlpha = 0;
              }
          }

          // Goal collision only counts if it hasn't faded away completely
          if (lvlState.lvl9GoalAlpha === undefined || lvlState.lvl9GoalAlpha > 0) {
              const goal = { x: lvlState.lvl9GoalX, y: lvlState.lvl9GoalY, w: 32, h: 32 };
              if (checkCollision(player, goal)) {
                  advanceLevel();
              }
          }
        }

`;

let startIdx = code.indexOf(startStr);
let endIdx = code.indexOf(endStr, startIdx);
if(startIdx !== -1 && endIdx !== -1) {
    code = code.substring(0, startIdx) + replacement + code.substring(endIdx);
    fs.writeFileSync('src/game.html', code);
    console.log("Level 9 logic replaced");
} else {
    console.log("Could not find boundaries");
}

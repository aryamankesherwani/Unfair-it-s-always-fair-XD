const fs = require('fs');
let code = fs.readFileSync('src/game.html', 'utf-8');

const startStr = `      } else if (lvl === 7) {`;

const endStr = `        drawGoal(720, 338, 32, 32, false);
      } else if (lvl === 8) {`;

const replacement = `      } else if (lvl === 7) {
        // Start ground
        drawGround(0, 370, 200, 80);
        // Massive right wall
        drawGround(300, 150, 500, 300);
        
        // Ceiling spikes
        drawSpikes(200, 0, 100, 32, 'down');
        
        // Spikes on right ledge
        drawSpikes(300, 118, 80, 32, 'up');

        // Bottom floor of shaft
        drawGround(200, 430, 100, 20);
        
        // Real Goal (hidden at bottom)
        drawGoal(234, 398, 32, 32, false);

        // Elevator
        ctx.save();
        ctx.fillStyle = '#94a3b8'; // silver/metal look
        ctx.fillRect(200, lvlState.lvl7ElevatorY, 100, 20);
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 2;
        ctx.strokeRect(200, lvlState.lvl7ElevatorY, 100, 20);
        // Stripes
        ctx.fillStyle = '#475569';
        for (let i = 0; i < 100; i += 20) {
            ctx.fillRect(200 + i + 8, lvlState.lvl7ElevatorY, 4, 20);
        }
        ctx.restore();

        // Fake Goal
        drawGoal(440, 118, 32, 32, false);
      } else if (lvl === 8) {`;

let startIdx = code.indexOf(startStr);
let endIdx = code.indexOf(endStr, startIdx);
if(startIdx !== -1 && endIdx !== -1) {
    code = code.substring(0, startIdx) + replacement + code.substring(endIdx + endStr.length);
    fs.writeFileSync('src/game.html', code);
    console.log("Render logic replaced");
} else {
    console.log("Could not find boundaries");
}

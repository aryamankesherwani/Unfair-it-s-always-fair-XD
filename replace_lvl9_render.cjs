const fs = require('fs');
let code = fs.readFileSync('src/game.html', 'utf-8');

const startStr = `      } else if (lvl === 9) {
        // LEVEL 9: The Screen Wrap Troll (3 Bait Platforms + Secret Screen Wrap)`;

const endStr = `      } else if (lvl === 10) {
        // LEVEL 10: The Hologram Pit (Fake Spikes & Hidden Lower Tunnel)`;

const replacement = `      } else if (lvl === 9) {
        // LEVEL 9: The Fading Slow Goal
        // Starting ground
        drawGround(0, 370, 150, 80);
        // Goal ground on right
        drawGround(690, 370, 110, 80);
        // Massive un-jumpable spike pit
        drawSpikes(150, 418, 540, 32);

        // Safe platforms
        ctx.save();
        ctx.fillStyle = '#94a3b8';
        ctx.fillRect(230, 310, 70, 18);
        ctx.fillRect(380, 270, 70, 18);
        ctx.fillRect(530, 310, 70, 18);
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 2;
        ctx.strokeRect(230, 310, 70, 18);
        ctx.strokeRect(380, 270, 70, 18);
        ctx.strokeRect(530, 310, 70, 18);
        ctx.restore();

        // Fading Goal
        let currentAlpha = lvlState.lvl9GoalAlpha;
        if (currentAlpha === undefined) currentAlpha = 1.0;
        
        if (currentAlpha > 0) {
            ctx.save();
            ctx.globalAlpha = currentAlpha;
            drawGoal(lvlState.lvl9GoalX, lvlState.lvl9GoalY, 32, 32, false);
            ctx.restore();
        }
`;

let startIdx = code.indexOf(startStr);
let endIdx = code.indexOf(endStr, startIdx);
if(startIdx !== -1 && endIdx !== -1) {
    code = code.substring(0, startIdx) + replacement + code.substring(endIdx);
    fs.writeFileSync('src/game.html', code);
    console.log("Level 9 render logic replaced");
} else {
    console.log("Could not find boundaries");
}

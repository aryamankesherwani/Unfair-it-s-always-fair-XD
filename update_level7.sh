#!/bin/bash
sed -i 's/lvl7CeilingY: 48,/lvl7ElevatorY: 370,/' src/game.html
sed -i 's/lvl7CeilingVy: 0,/lvl7ElevatorTriggered: false,/' src/game.html
sed -i 's/lvl7CeilingTriggered: false,//' src/game.html

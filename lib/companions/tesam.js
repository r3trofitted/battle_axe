"use strict";

var TesamCompanion = {
  races: {
    Elf: {
      backgroundOptions: 3,
      
      roundsBeforeSoulDeparture: 0, // TODO: handle special case (namely: no soul)
      statDeteriorationModifier: 4,
      recoveryMultiplier: 0.2,
      hitDice: 8,
      maxHitPoints: 110
    },
  }
}

for (var name in TesamCompanion.races) { BattleAxe.Race.forge(name, TesamCompanion.races[name]) };

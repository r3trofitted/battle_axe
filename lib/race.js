"use strict";

BattleAxe.Race = BattleAxe.furnace(BattleAxe.races, {
  quench: function (options) {
    options = options || {};
    
    var backgroundOptions         = options.backgroundOptions || 6,
        roundsBeforeSoulDeparture = options.roundsBeforeSoulDeparture || 12,
        statDeteriorationModifier = options.statDeteriorationModifier || 0,
        recoveryMultiplier        = options.recoveryMultiplier || 1.0,
        hitDice                   = options.hitDice || 8,
        maxHitPoints              = options.maxHitPoints || 120;
    
    Object.defineProperties(this, {
      backgroundOptions:          { value: backgroundOptions },
      roundsBeforeSoulDeparture:  { value: roundsBeforeSoulDeparture },
      statDeteriorationModifier:  { value: statDeteriorationModifier },
      recoveryMultiplier:         { value: recoveryMultiplier },
      hitDice:                    { value: hitDice },
      maxHitPoints:               { value: maxHitPoints },
    });
    
    return this;
  }
});

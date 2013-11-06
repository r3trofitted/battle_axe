"use strict";

BattleAxe.Race = BattleAxe.furnace({
  forge: function (options) {
    var race = Object.create(BattleAxe.Race).init(options);
    BattleAxe.races[options.name.replace(" ", "")] = race; // TODO: adjust the whole case, if needed (ie. force to camelCase)
    
    return race;
  },
  init: function (options) {
    options = options || {};
    
    var name = options.name;
    var backgroundOptions         = options.backgroundOptions || 6,
        roundsBeforeSoulDeparture = options.roundsBeforeSoulDeparture || 12,
        statDeteriorationModifier = options.statDeteriorationModifier || 0,
        recoveryMultiplier        = options.recoveryMultiplier || 1.0,
        hitDice                   = options.hitDice || 8,
        maxHitPoints              = options.maxHitPoints || 120;
        
    
    Object.defineProperties(this, {
      name:                       { value: name },
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

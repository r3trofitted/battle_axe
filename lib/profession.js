"use strict";

BattleAxe.Profession = BattleAxe.furnace(BattleAxe.professions, {
  quench: function (options) {
    options = options || {};
    
    var primeStats = options.primeStats || [];
    
    Object.defineProperties(this, {
      primeStats: { value: primeStats },
    });
    
    return this;
  }
});

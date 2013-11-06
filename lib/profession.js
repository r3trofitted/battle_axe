"use strict";

BattleAxe.Profession = BattleAxe.furnace({
  forge: function (options) {
    var profession = Object.create(BattleAxe.Profession).init(options);
    BattleAxe.professions[options.name.replace(" ", "")] = profession;
    
    return profession;
  },
  init: function (options) {
    options = options || {};
    
    var name = options.name;
    var primeStats = options.primeStats || [];
        
    
    Object.defineProperties(this, {
      name:       { value: name },
      primeStats: { value: primeStats },
    });
    
    return this;
  }
});

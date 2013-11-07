"use strict";

BattleAxe.Character = Object.freeze({
  create: function () {
    var c = Object.create(BattleAxe.Character);
    return c.init.apply(c, arguments);
  },
  init: function (race, profession, options) {
    if (!(BattleAxe.Race.isPrototypeOf(race))) { throw new Error("init(): first arg must be a valid race"); }
    if (!(BattleAxe.Profession.isPrototypeOf(profession))) { throw new Error("init(): second arg must be a valid profession"); }
    options = options || {}
    
    var level = options.level || 1;
    
    Object.defineProperties(this, {
      race:       { value: race },
      profession: { value: profession },
      level: {
        get: function () { return level }
      }
    });
    
    return this;
  },
  statBonus: function (stat) {
    // return this.stats[stat].bonus;
  },
  skillsSimilarTo: function (skill) {
    return [];
  },
  levelBonusForSkill: function (skill) {},
});

// Shorcuts
BattleAxe.character = BattleAxe.Character.create;

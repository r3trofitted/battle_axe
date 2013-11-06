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
    
    this.race.pourInto(this);
    
    return this;
  },
  statBonus: function (name) {},
  skillsSimilarTo: function (skill) {
    return [];
  },
  levelBonusForSkill: function (skill) {},
});

// Shorcuts
BattleAxe.character = BattleAxe.Character.create;

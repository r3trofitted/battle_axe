"use strict";

var CharacterLaw = {
  races: {
    Human: {},
  },
  professions: {
    Fighter: {
      primeStats: ["CO", "ST"]
    },
    Thief: {
      primeStats: ["AG", "QU"]
    },
    Rogue: {
      primeStats: ["AG", "ST"]
    },
    WarriorMonk: {
      primeStats: ["SD", "QU"]
    }
  }
}

for (var name in CharacterLaw.races) { BattleAxe.Race.forge(name, CharacterLaw.races[name]) };
for (var name in CharacterLaw.professions) { BattleAxe.Profession.forge(name, CharacterLaw.professions[name]) };

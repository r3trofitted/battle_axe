"use strict";

var CharacterLaw = {
  races: [
  {
    name: "Human",
  },
  ],
  professions: [
  {
    name: "Figher",
    primeStats: ["CO", "ST"]
  },
  {
    name: "Thief",
    primeStats: ["AG", "QU"]
  },
  {
    name: "Rogue",
    primeStats: ["AG", "ST"]
  },
  {
    name: "Warrior Monk",
    primeStats: ["SD", "QU"]
  }
  ]
}

CharacterLaw.races.forEach(function (race) { BattleAxe.Race.forge(race) });
CharacterLaw.professions.forEach(function (profession) { BattleAxe.Profession.forge(profession) });

"use strict";
BattleAxe = BattleAxe || {};

BattleAxe.Character = function (race, profession) {
  this.race       = function () { return race; }
  this.profession = function () { return profession; }
};

BattleAxe.Character.prototype = {
  race: { }
}

BattleAxe.Character.prototype.statBonus = function (name) {
  return BattleAxe.bonus(); // TODO
};

BattleAxe.Character.prototype.skillsSimilarTo = function () {
  return []; // TODO
}

BattleAxe.Character.prototype.levelBonusForSkill = function (skill) {
  return BattleAxe.bonus(); // TODO
}

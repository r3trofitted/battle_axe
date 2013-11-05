BattleAxe = BattleAxe || {};
BattleAxe.skill = function (character, systemSkill, options) {
  systemSkill = systemSkill || {};
  options     = options || {};
  
  return Object.create(BX.Skill, {
    character:     { value: character },
    name:          { value: (options.name || systemSkill.name) },
    stat:          { value: (options.stat || systemSkill.stat) },
    ranks:         { value: options.ranks || BX.Skill.ranks },
    objectBonuses: { value: (options.objectBonuses || BX.Skill.objectBonuses) },
    miscBonuses:   { value: (options.miscBonuses || BX.Skill.miscBonuses) }
  });
};

BattleAxe.Skill = {
  character: undefined,
  name: undefined,
  stat: undefined,
  ranks: 0,
  objectBonuses: [],
  miscBonuses: [],
  
  bonus: function () {
    return BattleAxe.addBonuses(this.ranksBonus(), this.statBonus(), this.levelBonus(), this.objectsBonus(), this.miscBonus());
  },
  ranksBonus: function () {
    var actual = this._actualRanksBonus(),
       similar = this._ranksBonusOfASimilarSkill();

    return (similar && similar.gt(actual)) ? similar : actual;
  },
  statBonus: function () {
    if (this.stat === undefined) {
      return BattleAxe.bonus();
    } else {
      return this.character.statBonus(this.stat);
    }
  },
  levelBonus: function () {
    return this.character.levelBonusForSkill(this);
  },
  objectsBonus: function () {
    return BattleAxe.addBonuses(this.objectBonuses.slice(0));
  },
  miscBonus: function () {
    return BattleAxe.addBonuses(this.miscBonuses.slice(0));
  },
  _actualRanksBonus: function () {
    var bonus;
  
    if (this.ranks > 20) {
      bonus = 70 + (this.ranks - 20) * 1;
    } else if (this.ranks > 10) {
      bonus = 50 + (this.ranks - 10) * 2;
    } else if (this.ranks > 0) {
      bonus = this.ranks * 5;
    } else {
      bonus = -25
    }
  
    return BattleAxe.bonus(bonus);
  },
  _ranksBonusOfASimilarSkill: function () {
    var similarSkills = this.character.skillsSimilarTo(this);
  
    if (similarSkills.length > 0) {
      var bestSimilarSkill  = similarSkills.reduce(function (a, b) { return a._actualRanksBonus().gt(b._actualRanksBonus()) ? a : b });
      var similarSkillBonus = bestSimilarSkill._actualRanksBonus().half();
    
      similarSkillBonus.inscribe = function () { return "(" + BattleAxe.Bonus.inscribe.call(this) + ")" }
      return similarSkillBonus;
    }
  }
};
// TODO: should we freeze Skill?
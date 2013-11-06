"use strict";

/**
 * Prototype for a character skill
 *
 * A character skill is basically a row in the “skills” sections on a character's sheet: a combinaison of ranks and
 * various bonuses, summed into a single bonus which can be applied whenever the skill is used.
 *
 * The CharacterSkill object itself is a prototype which should not be used directly.
 */
BattleAxe.CharacterSkill = Object.freeze({
  /**
   * Factory method.
   * 
   * Creates and initializes a new skill object with CharacterSkill for prototype.
   */
  create: function (character, systemSkill, options) {
    return Object.create(BattleAxe.CharacterSkill).init(character, systemSkill, options);
  },
  
  /**
   * Initialiazer
   *
   * Defines this initial stat of the skill.
   * The character, name and stat should never change; therefore, they are defined as enumerable, not writable and not configurable data properties.
   * On the contrary, the ranks, objectBonuses and miscBonuses can change. Thus, they are defined are enumerable accessor properties.
   */
  init: function (character, systemSkill, options) {
    systemSkill = systemSkill || {};
    options     = options || {};
  
    var name          = options.name || systemSkill.name,
        stat          = options.stat || systemSkill.stat,
        ranks         = options.ranks || 0,
        objectBonuses = (options.objectBonuses || []).slice(0), // We slice to get a copy of options.objectBonuses, not the original
        miscBonuses   = (options.miscBonuses || []).slice(0);
  
    Object.defineProperties(this, {
      character: { value: character },
      name:      { value: name },
      stat:      { value: stat },
      ranks:     {
        get: function () { return options.ranks || 0; },
        set: function (n) { ranks = n; }
      },
      objectBonuses: {
        get: function () { return objectBonuses; },
        set: function (a) { objectBonuses = a; }
      },
      miscBonuses: {
        get: function () { return miscBonuses; },
        set: function (a) { miscBonuses = a; }
      }
    });
    
    return this;
  },
  bonus: function () {
    return BattleAxe.Bonus.sumOf(this.ranksBonus(), this.statBonus(), this.levelBonus(), this.objectsBonus(), this.miscBonus());
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
    return BattleAxe.Bonus.sumOf(this.objectBonuses.slice(0));
  },
  miscBonus: function () {
    return BattleAxe.Bonus.sumOf(this.miscBonuses.slice(0));
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
});

// Shortcuts
BattleAxe.skill = BattleAxe.CharacterSkill.create;
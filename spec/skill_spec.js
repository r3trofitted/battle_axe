describe("A Skill", function () {
  var character;
  var skill;
  
  beforeEach(function () {
    character = new BattleAxe.Character();
    skill     = BattleAxe.skill(character);
  });
  
  describe(".bonus()", function () {
    it("is the sum of ranks, stat, level, objects and misc bonuses", function () {
      var skill = BattleAxe.skill(new BattleAxe.Character());
      
      spyOn(skill, 'ranksBonus').andReturn(BX.bonus(5));
      spyOn(skill, 'statBonus').andReturn(BX.bonus(10));
      spyOn(skill, 'levelBonus').andReturn(BX.bonus(15));
      spyOn(skill, 'objectsBonus').andReturn(BX.bonus(20));
      spyOn(skill, 'miscBonus').andReturn(BX.bonus(25));
      
      var bonus = skill.bonus();
      expect(bonus).toBeABonusOf(75);
      
      expect(skill.ranksBonus).toHaveBeenCalled();
      expect(skill.statBonus).toHaveBeenCalled();
      expect(skill.levelBonus).toHaveBeenCalled();
      expect(skill.objectsBonus).toHaveBeenCalled();
      expect(skill.miscBonus).toHaveBeenCalled();
    });
  });
  
  describe(".ranksBonus()", function () {
    it("returns the similar skill ranks bonus if it is greater than the actual ranks bonus", function () {
      spyOn(skill, '_actualRanksBonus').andReturn(BX.bonus(20));
      spyOn(skill, '_ranksBonusOfASimilarSkill').andReturn(BX.bonus(30));
    
      var ranksBonus = skill.ranksBonus();
      expect(ranksBonus).toBeABonusOf(30);
    });
  });
  
  describe("._actualRanksBonus()", function () {
    it("is 5 per rank up to rank 10", function () {
      for (var i = 1; i <= 10; i++) {
        var skill = BattleAxe.skill(undefined, undefined, { ranks: i });
        expect(skill._actualRanksBonus()).toBeABonusOf(i*5);
      }
    });
    it("is 2 per rank from rank 11 up to rank 20", function () {
      for (var i = 11; i <= 20; i++) {
        var skill = BattleAxe.skill(undefined, undefined, { ranks: i });
        expect(skill._actualRanksBonus()).toBeABonusOf(50 + (i - 10)*2);
      }
    });
    it("is 1 per rank from rank 21 up to rank 25", function () {
      for (var i = 21; i <= 25; i++) {
        var skill = BattleAxe.skill(undefined, undefined, { ranks: i });
        expect(skill._actualRanksBonus()).toBeABonusOf(70 + (i - 20)*1);
      }
    });
    it("is -25 if the skill has no rank", function () {
      expect(BattleAxe.skill()._actualRanksBonus()).toBeABonusOf(-25);
    });
  });
  
  describe("._ranksBonusOfASimilarSkill()", function () {
    function skillWithStubbedRanksBonus(bonus) {
      return {
        _actualRanksBonus: function () {
          return BX.bonus(bonus);
        }
      };
    };
    
    it("asks the Character object for a similar skill", function () {
      spyOn(character, "skillsSimilarTo").andCallThrough();
      
      skill._ranksBonusOfASimilarSkill();
      
      expect(character.skillsSimilarTo).toHaveBeenCalledWith(skill);
    });
    
    it("is half the highest ranks bonus of the similar skills", function () {
      var lowSimilar  = skillWithStubbedRanksBonus(20);
      var highSimilar = skillWithStubbedRanksBonus(30);
      character.skillsSimilarTo = function (skill) { return [lowSimilar, highSimilar] }; // Stub
      
      expect(skill._ranksBonusOfASimilarSkill()).toBeABonusOf(15); // 30 / 2
    });
    
    it("returns a bonus with a customized .inscribe() method", function () {
      var stubbedSkill = skillWithStubbedRanksBonus(30);
      character.skillsSimilarTo = function (skill) { return [stubbedSkill] };
      
      expect(skill._ranksBonusOfASimilarSkill()).toBeABonusInscribedAs("(+15)");
    });
  });

  describe(".statBonus()", function () {
    it("returns a no-value bonus if it has no associated stat", function () {
      var skill = BattleAxe.skill();
      
      expect(skill.statBonus()).toBeANoValueBonus();
    });
    
    it("asks its character for the appropriate stats bonus", function () {
      var skill = BattleAxe.skill(character, undefined, { stat: "ST" });
      var bonus = BX.bonus(20)
      spyOn(character, "statBonus").andReturn(bonus);
      
      statBonus = skill.statBonus();
      
      expect(character.statBonus).toHaveBeenCalledWith("ST");
      expect(statBonus).toBe(bonus);
    });
  });
  
  describe(".levelBonus", function () {
    it("asks its character for the appropriate bonus", function () {
      var bonus = BX.bonus(9);
      spyOn(character, "levelBonusForSkill").andReturn(bonus);
      
      levelBonus = skill.levelBonus();
      
      expect(character.levelBonusForSkill).toHaveBeenCalledWith(skill);
      expect(levelBonus).toBe(bonus);
    });
  });
  
  describe(".objectsBonus", function () {
    it("returns a no-value bonus if it has no object bonus", function () {
      expect(skill.objectsBonus()).toBeANoValueBonus();
    });
    
    it("returns a bonus that is the sum of all its object bonuses", function () {
      skill = BX.skill(undefined, undefined, { objectBonuses: [BX.bonus(5), BX.bonus(10)]})
      expect(skill.objectsBonus()).toBeABonusOf(15);
    });
  });
  
  describe(".miscBonus", function () {
    it("returns a no-value bonus if it has no misc bonus", function () {
      expect(skill.miscBonus()).toBeANoValueBonus();
    });
    
    it("returns a bonus that is the sum of all its misc bonuses", function () {
      skill = BX.skill(undefined, undefined, { miscBonuses: [BX.bonus(15), BX.bonus(3)]})
      expect(skill.miscBonus()).toBeABonusOf(18);
    });
  });
});

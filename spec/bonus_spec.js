describe("A Bonus object", function () {
  describe(".create()", function () {
    it("accepts another Bonus object as a value", function () {
      var value = BattleAxe.Bonus.create(10);
      var bonus = BattleAxe.Bonus.create(value);
    
      expect(bonus).toBeABonusOf(10);
    });
  });
  describe(".inscribe()", function () {
    it("returns the value prefixed with a + sign if the value is positive", function () {
      var bonus = BattleAxe.bonus(20);
      expect(bonus.inscribe()).toBe("+20");
    });
    
    it("returns the value prefixed with a - sign if the value is negative", function () {
      var bonus = BattleAxe.bonus(-20);
      expect(bonus.inscribe()).toBe("-20");
    });
        
    it("returns +0 if the value is 0", function () {
      var bonus = BattleAxe.bonus(0);
      expect(bonus.inscribe()).toBe("+0");
    });
        
    it("returns · if the value is undefined", function () {
      var bonus = BattleAxe.bonus();
      expect(bonus.inscribe()).toBe("·");
    });
  
    it("can append the origin of the bonus", function () {
      var bonus = BattleAxe.bonus(10, "special bonus");
      expect(bonus.inscribe(true)).toEqual("special bonus: +10");
    })
  });
  
  describe(".add()", function () {
    var bonus;
    
    beforeEach(function () {
      bonus = BattleAxe.bonus(20);
    })
    
    it("accepts a numeric value", function () {
      expect(bonus.add(5)).toBeABonusOf(25);
    });
    
    it("accepts another Bonus object", function () {
      var extraBonus = BattleAxe.bonus(5);
      expect(bonus.add(extraBonus)).toBeABonusOf(25);
    });
    
    it("accepts more than one bonus to add", function () {
      var firstExtraBonus  = BattleAxe.bonus(5);
      var secondExtraBonus = BattleAxe.bonus(7);
      
      expect(bonus.add([firstExtraBonus, secondExtraBonus, 10])).toBeABonusOf(42);
    });
    
    it("accepts an origin for the new bonus", function () {
      var extraBonus = BattleAxe.bonus(10);
      expect(bonus.add(extraBonus, "new bonus").origin).toEqual("new bonus");
      expect(bonus.add([extraBonus, 10], "new bonus from several bonuses").origin).toEqual("new bonus from several bonuses");
    });
    
    it("defined a default name to the new bonus", function () {
      var firstBonus  = BattleAxe.bonus(5, "first bonus");
      var secondBonus = BattleAxe.bonus(10, "second bonus");
      
      expect(firstBonus.add(secondBonus).origin).toEqual("first bonus, second bonus");
    });
    
    describe("if the current value is undefined", function () {
      beforeEach(function () {
        bonus = BattleAxe.bonus();
      });
      
      it("acts as if the current value is 0 if the added value is defined", function () {
        var newBonus = bonus.add(15);
        expect(newBonus).toBeABonusOf(15);
      });
    
      it("creates a new bonus with an undefine value if the value of the added bonus is also undefined", function () {
        var extraBonus = BattleAxe.bonus();
        var newBonus   = bonus.add(extraBonus);
        
        expect(newBonus).toBeANoValueBonus();
      })
    });
  });

  describe(".half()", function () {
    it("returns a new bonus whose value is half its own", function () {
      expect(BattleAxe.bonus(30).half()).toBeABonusOf(15);
      expect(BattleAxe.bonus(15).half()).toBeABonusOf(8); // 7.5, rounded
    });
  });
  
  describe(".gt()", function () {
    var bonus = BattleAxe.bonus(10);
    
    it("return true if its own value is greater than the other's value", function () {
      expect(bonus.gt(BattleAxe.bonus(5))).toBe(true);
    });
    
    it("accepts an integer", function () {
      expect(bonus.gt(5)).toBe(true);
    })
  });
});

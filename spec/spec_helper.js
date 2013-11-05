beforeEach(function() {
  this.addMatchers({
    toBeABonusOf: function (expectedBonusValue) {
      if (!(BattleAxe.Bonus.isPrototypeOf(this.actual))) { return false }

      var actual = this.actual;
      this.message = function () {
        return "Expected " + actual.inscribe() + " to be a bonus of " + expectedBonusValue;
      }
      
      return actual.value === expectedBonusValue;
    },
    toBeABonusInscribedAs: function (expectedBonusInscription) {
      if (!(BattleAxe.Bonus.isPrototypeOf(this.actual))) { return false }
      
      return this.actual.inscribe() === expectedBonusInscription;
    },
    toBeANoValueBonus: function() {
      if (!(BattleAxe.Bonus.isPrototypeOf(this.actual))) { return false }
      
      return this.actual.value === undefined;
    },
  });
});

"use strict";
BattleAxe = BattleAxe || {};

BattleAxe.Bonus = (function () {
  var ORIGINS_COMBINATOR         = ", ",
      GLYPH_FOR_UNDEFINED_VALUES = "·";
  
  return Object.freeze({
    create: function (bonusOrValue, origin) {
      return BattleAxe.Bonus.isPrototypeOf(bonusOrValue) ? bonusOrValue : Object.create(BattleAxe.Bonus).init(bonusOrValue, origin);
    },
    init: function (val, origin) {
      origin = origin || "";
      
      Object.defineProperties(this, {
        value:  { value: val },
        origin: { value: origin }
      });
      
      return this;
    },
    sumOf: function (bonuses) {
      if (arguments.length > 1) { bonuses = Array.prototype.slice.call(arguments) }

      var first = bonuses.shift();
      if (!(BattleAxe.Bonus.isPrototypeOf(first))) { first = BattleAxe.bonus(first) }

      return first.add(bonuses);
    },
    inscribe: function (appendOrigin) {
      var v = this.value, 
          s = String(v);
  
      if (this._hasNoValue()) {
        s = GLYPH_FOR_UNDEFINED_VALUES;
      } else if (v >= 0) {
        s = "+" + s;
      }
  
      return appendOrigin ? (this.origin + ": " + s) : s;
    },
    gt: function (other) {
      if (!(BattleAxe.Bonus.isPrototypeOf(other))) { other = BattleAxe.bonus(other) };
  
      return this._valueForComputation() > other._valueForComputation();
    },
    add: function (other, origin) {
      if (Array.isArray(other)) {
        var b = this.add(other.shift(), origin);
        return other.length > 0 ? b.add(other, origin) : b;
      } else if (!BattleAxe.Bonus.isPrototypeOf(other)) {
        other = BattleAxe.bonus(other);
      }
  
      var newValue, newOrigin;
      if (other._hasNoValue() && this._hasNoValue()) {
        newValue = undefined;
      } else {
        newValue = this._valueForComputation() + other._valueForComputation();
      }
      newOrigin = origin || [this.origin, other.origin].join(ORIGINS_COMBINATOR);
      return BattleAxe.bonus(newValue, newOrigin);
    },
    half: function (origin) {
      return BattleAxe.bonus(Math.round(this._valueForComputation() / 2), origin);
    },
    _hasNoValue: function () {
      return this.value === undefined;
    },
    _valueForComputation: function () {
      return parseInt(this.value || 0);
    },
  });
})();

// Shortcuts
BattleAxe.bonus = BattleAxe.Bonus.create;
"use strict";
var BattleAxe = {
  races: {},
  professions: {},
  
  furnace: function (obj) {
    if (Object.keys(obj).indexOf("forge") < 0) { throw new Error("furnace(): the definition must have a forge() method") }
    
    var proto = BattleAxe.furnace.proto || (
      BattleAxe.furnace.proto = {
        pourInto: function (obj) {
          for (var prop in this) {
            obj[prop] = this[prop];
          };
          
          return obj;
        }
      }
    );
    
    var f = Object.create(proto);
    proto.pourInto.call(obj, f);
    
    return f;
  },
};

// Shortcuts
var BX = BattleAxe;


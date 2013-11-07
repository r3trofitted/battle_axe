"use strict";
var BattleAxe = {
  races: {},
  professions: {},
  
  furnace: function (collection, definition) {
    // Defining the prototype for all furnaced objects (if needed)
    var proto = {
      /**
       * Factory method for objects
       *
       */
      forge: function (name) {
        var forged = Object.create(this).quench(Array.prototype.slice.call(arguments, 1));
        
        if (name) {
          collection[name] = forged;
          Object.defineProperty(forged, "name", { value: name });
        }
    
        return forged;
      },
      quench: function (options) {
        return this; // noop
      }
    }
    
    // Creating the furnaced object itself
    var furnacedObject = Object.create(proto);
    
    // Mixing in the definition
    Object.getOwnPropertyNames(definition).forEach(function (prop) {
      if (!furnacedObject.hasOwnProperty(prop)) {
        furnacedObject[prop] = definition[prop];
      }
    }, this);
    
    return furnacedObject;
  },
};

// Shortcuts
var BX = BattleAxe;


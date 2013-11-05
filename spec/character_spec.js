describe("Character", function () {
  var character;
  
  describe("the constructor", function () {
    it("accepts a 'race' parameter", function () {
      character = new BX.Character(BX.CL.Races.Human);
      expect(character.race()).toBe(BX.CL.Races.Human);
    });
    
    it("accepts a string as the 'race' parameter", function () {
      character = new BX.Character("human");
      expect(character.race()).toBe(BX.CL.Races.Human);
    });
  });
  
  describe(".statBonus", function () {
    it("depends on the character's profession", function () {
      // character = new BX.Character(undefined, "fighter");
    });
  });
});

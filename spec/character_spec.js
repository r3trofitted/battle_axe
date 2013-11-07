describe("Character", function () {
  var character;
  
  describe(".init()", function () {
    beforeEach(function () {
      character = Object.create(BattleAxe.Character);
    });
    
    it("accepts a 'race' argument", function () {
      var race = BattleAxe.Race.forge();
      
      character.init(race, stubs.profession());
      
      expect(character.race).toBe(race);
    });
    
    it("accepts a 'profession' argument", function () {
      var profession = BattleAxe.Profession.forge();
      
      character.init(stubs.race(), profession);
      
      expect(character.profession).toBe(profession);
    });
  });
  
  describe(".statBonus()", function () {
    it("returns the total bonus for the requested stat", function () {
      // TODO
    });
  });
});

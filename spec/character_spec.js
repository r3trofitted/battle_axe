describe("Character", function () {
  var character;
  
  describe(".init()", function () {
    beforeEach(function () {
      character = Object.create(BattleAxe.Character);
    });
    
    it("accepts a 'race' argument", function () {
      var race = BattleAxe.Race.forge({ name: "StubbedRace" });
      
      character.init(race, stubs.profession());
      
      expect(character.race).toBe(race);
    });
    
    it("accepts a 'profession' argument", function () {
      var profession = BattleAxe.Profession.forge({ name: "StubbedProfession" });
      
      character.init(stubs.race(), profession);
      
      expect(character.profession).toBe(profession);
    });
  });  
});

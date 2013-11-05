# Battle Axe


BattleAxe will eventually be JS library for the Rolemaster (RM2/RMC edition) rules: character creation, combat resolution, etc.


## For the developers

BattleAxe is also a playground for JS development. Here are the self-imposed guidelines for this project:

* **No classes and no constructor**. Objects everywhere, but staying a close to vanilla, prototype-based OO (and, if need,
  inheritence) as possible.
* **Immutable objects (sometimes)**. Immutability is interesting, if not actually useful in JS. Let's try to make so that
  objects are immutable, when possible (ie. when they are simple enough).
* **Tests!** This goes without saying.

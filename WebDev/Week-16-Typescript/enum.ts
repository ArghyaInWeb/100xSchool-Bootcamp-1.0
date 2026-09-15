//? Enum is a special "class" that represents a group of constants (unchangeable variables).

//? Here is an example of how to use enums in TypeScript:

//  type keyPress = "Up" | "Down" | "Left" | "Right" //NOTE Instead of using type we can also use enum to define the keyPress type

//? Enums are a way to define a set of named constants. 
//? They can be numeric or string-based. In this example, we define an enum called `Direction` with four possible values: 
//? `Up`, `Down`, `Left`, and `Right`. 
//? Each value is automatically assigned a numeric value starting from 0.
enum Direction {
  Up, // 0
  Down, // 1
  Left, // 2
  Right, // 3
}

enum DirectionString { //? String-based enum
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}


console.log(Direction.Up); // 0
console.log(Direction.Down); // 1
console.log(Direction.Left); // 2
console.log(Direction.Right); // 3


function doSomething(keyPressed: Direction) {
  if (keyPressed == Direction.Up) {
    // do something
  }
}

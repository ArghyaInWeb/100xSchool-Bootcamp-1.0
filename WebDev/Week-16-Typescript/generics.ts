//? Generics are a way to say: "this function/class works the same way no matter what type you throw at it, but I still want TypeScript to remember exactly what type that was."

//? Or even simpler: **it's a fill-in-the-blank for types, instead of values.**
 
//? You write the logic once using a placeholder (`T`), and TypeScript fills in the actual type — `string`, `number`, a custom object, whatever — based on what you actually pass in, so you get full type-checking without writing the same function over and over.


function identity<T>(arg: T): T { //NOTE The <T> is a placeholder for the type that will be passed in when the function is called. It can be any valid TypeScript type.
    return arg
}

let output1 = identity("String")
let output2 = identity(0o7)

// let output1 = identity<string>("String") //? You can also explicitly mention the type you want to function to return 
// let output2 = identity<number>(0o7)


console.log(output1, output2)


function getFirstElement<T>(arr: T[]) {
    return arr[0]
}

console.log(getFirstElement(["A", "B", "C"]))
console.log(getFirstElement([1, 2, 3]))

let s = getFirstElement(["A", "B", "C"])
// console.log(s.toLocaleLowerCase())
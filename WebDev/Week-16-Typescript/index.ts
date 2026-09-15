//------------------------------------------------------------------------------

// function greet(firstName: string) {
//     console.log("Hello " + firstName)
// }

// greet("Arghya")

// function firstElement(arr: number[]): number | null { //NOTE return type can be explicitly mention
//     if(arr.length > 0) {
//         return arr[0] ?? null
//     }
//     return null
// }

// let x = firstElement([])


//------------------------------------------------------------------------------

// //? function type

// function delayedMessage(fn: () => void) { //NOTE This argument takes function Parameter with 0 arguments and no return
//     setTimeout(fn, 1000);
// }

// function message() {
//     console.log("Delayed by 1 sec")
// }

// let msg = delayedMessage(message)


// let age = 18
// age = "arghya"
// console.log(age)

//------------------------------------------------------------------------------

// import express from "express"

// const app = express()

// interface Signup { //NOTE Interface is used to define the shape of an object
//     username: String,
//     password: String
// }

// app.post("/signup", (req, res) => {
//     const body: Signup = req.body //NOTE Type assertion is used to tell the compiler that req.body is of type Signup
// })

//------------------------------------------------------------------------------

// interface User {
//     username: string,
//     password: string,
//     email: string,
//     age: number
// }

// let user1: User = {
//     username: "string",
//     password: "string",
//     email: "string",
//     age: 22
// }

// let user2: User = {
//     username: "str2222ing",
//     password: "string",
//     email: "string",
//     age: 17
// }
// function isLegal(user: User) {
//     return user.age >= 18 ? true : false
// }

// console.log(isLegal(user1))
// console.log(isLegal(user2))

//------------------------------------------------------------------------------

//? Interface Vs. type

interface user1 {
    name: string,
    age: number
}

type user2 = {
    name: string,
    age: number
}

//? Both interface and type can be used to define the shape of an object.
//? The main difference is that (interface) can be extended and implemented, while (type) cannot.

//? Type also provides some advanced features like union types,
//? intersection types, and mapped types, which are not available in interfaces.

//! UNION
//? Union types allow you to define a variable that can hold multiple types of values.
//? For example, you can define a variable that can hold either a string or a number.

type PinCode = string | number

let pinCode: PinCode = 123123 //? pinCode can be either a string or a number
pinCode = "123abd"
pinCode = "random"

//! INTERSECTION
//? Intersection types allow you to combine multiple types into a single type.
//? For example, you can define a type that combines the properties of two different types.

type User = {
    name: string,
    age: number
}

type Address = {
    city: string,
    state: string
}

type AllUserDetail = User & Address
//? AllUserDetail is a type that combines the properties of User and Address types.
//? So it kinds of look like this:

//? AllUserDetail {
//?     name: string,
//?     age: number,
//?     city: string,
//?     state: string
//? }

//------------------------------------------------------------------------------
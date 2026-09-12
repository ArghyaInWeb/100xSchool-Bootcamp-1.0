import mongoose from "mongoose";

mongoose.connect("mongodb+srv://Arghya:nMbWugNkczmcq0aZ@cluster0.zoatl6l.mongodb.net/Todo-Application")

const UserSchema = new mongoose.Schema({
    username: String,
    password: String
})

const TodoSchema = new mongoose.Schema({
    title: String,
    description: String,
    userId: mongoose.Types.ObjectId
})

export const userModel = mongoose.model("Users", UserSchema)
export const todoModel = mongoose.model("Todos", TodoSchema)
import mongoose from "mongoose"
mongoose.connect("mongodb+srv://Arghya:nMbWugNkczmcq0aZ@cluster0.zoatl6l.mongodb.net/trello")

const UserSchema = mongoose.Schema({
    username: String,
    password: String
})

const OrganizationSchema = mongoose.Schema({
    title: String,
    description: String,
    admin: {
        type: mongoose.Types.ObjectId,
        ref: "Users"
    },
    members: [{
        type: mongoose.Types.ObjectId,
        ref: "Users"
    }]
})

const BoardSchema = mongoose.Schema({
    title: String,
    organization: {
        type: mongoose.Types.ObjectId,
        ref: "Organizations"
    },
})

const IssueSchema = mongoose.Schema({
    title: String,
    board: {
        type: mongoose.Types.ObjectId,
        ref: "Boards"
    },
})

const userModel = mongoose.model("Users", UserSchema)
const organizationModel = mongoose.model("Organizations", OrganizationSchema)
const boardModel = mongoose.model("Boards", BoardSchema)
const issueModel = mongoose.model("Issues", IssueSchema)

export {
    userModel,
    organizationModel,
    boardModel,
    issueModel
}
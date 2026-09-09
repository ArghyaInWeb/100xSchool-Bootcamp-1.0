import express from "express"

const app = express()
let notes = []

app.use(express.json())
app.use(express.static("."))

app.get('/', (req, res) => {
    res.sendFile("E:/CODING/100xBootcamp-1/100xBootcamp-Codes/WebDev/Week-9-Notes-App/frontend/index.html")
})

// POST - Create a note
app.post('/new-note', (req, res) => {
    const note = req.body.newNote
    notes.push(note)

    res.json({
        message: "Note created"
    })
})

// */ GET - Get all notes of an user
app.get('/notes', (req, res) => {
    res.json(notes)
})

app.listen(3000, () => {
    console.log(`http://localhost:${3000}`)
})
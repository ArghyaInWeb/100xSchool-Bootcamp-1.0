import express from "express";

const app = express()
const PORT = 8000

app.use(express.static("."));
app.use(express.json())

app.post('/sum', (req, res) => {
    let a = Number(req.body.a)
    let b = Number(req.body.b)
    const sum = a + b
    res.json({
        ans: sum
    })
})

app.post('/sub/', (req, res) => {
    let a = Number(req.body.a)
    let b = Number(req.body.b)
    const diff = a - b
    res.json({
        ans: diff
    })
})

app.post('/mul/', (req, res) => {
    let a = Number(req.body.a)
    let b = Number(req.body.b)
    const prod = a * b

    res.json({
        ans: prod
    })
})

app.post('/div/', (req, res) => {
    let a = Number(req.body.a)
    let b = Number(req.body.b)
    const quot = a / b

    res.json({
        ans: quot
    })
})

app.listen(PORT, () => {
    console.log(`running at port: ${PORT}`)
})
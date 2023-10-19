import express from 'express'

const app = express()
app.use(express.json()) // Middelware que transforma la req.body en json

const PORT = 3000;

app.get('/ping', (req, res) => {
    console.log('Ping!')
    res.send('Pong!')
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

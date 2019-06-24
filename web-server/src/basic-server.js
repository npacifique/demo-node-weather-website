const express = require('express')

const app = express()
app.get('', (req, res)=>{
    res.send('Hello express')
})


app.get('/help',(req, res)=>{
    res.send('help page')
})

app.get('/about', (req, res)=>{
    res.send('About page')
})

app.get('/html',(req, res)=>{
    res.send('<h1>Sample html</h1>')
})

app.get('/json',(req,res)=>{
    res.send({
        name: 'Pacifique',
        age: 27
    })
})

app.listen(3000, ()=>{
    console.log('server is up on port 3000')
})
const express = require('express');
const app = express();
//const http = require('http')
const port = 3000
//const fs = require('fs')
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))
app.set('views', './views')
app.set('view engine', 'ejs')
app.get('/', (req, res) => {
    res.render('index')
})
app.get('/feedback', (req, res) => {
    res.render('feedback')
})
app.get('/game', (req, res) => {
    res.render('game')
})
app.get('/gifts', (req, res) => {
    res.render('gifts')
})
app.get('/hobby', (req, res) => {
    res.render('hobby')
})
app.listen(port, () => console.info('Listening on port ${port}'))
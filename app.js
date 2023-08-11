const express = require('express');

// Express app
const app = express();

// Listen for request
app.listen(3000);

app.get('/', (req, res) => {
    // res.send('<p>Hi there</p>')
    res.sendFile('./pages/index.html', {root: __dirname})
})

app.get('/about', (req, res) => {
    res.sendFile('./pages/about.html', {root: __dirname})
})

// Redirects
app.get('/about-us', (req, res) => {
    res.redirect('/about');
})

// 404 page
app.use((req,res) => {
    res.sendFile('./pages/404.html', {root: __dirname})
})
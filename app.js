const express = require('express');

// Express app
const app = express();

// Register view engine
app.set('view engine', 'ejs');

// Listen for request
app.listen(3000);

app.get('/', (req, res) => {
    // res.send('<p>Hi there</p>')
    res.render('index');
})

app.get('/employeeslist', (req, res) => {
    res.render('employeeslist')
})

// // Redirects
// app.get('/about-us', (req, res) => {
//     res.redirect('/about');
// })

// 404 page
app.use((req,res) => {
    res.status(404).render('404')
})
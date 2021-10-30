const express = require('express');
const path = require('path');

// Create our Express app
const app = express();

// Tell express that we're using ejs as our view engine
app.set('view engine', 'ejs');

// Base middlewares
app.use('/', express.static(path.join(__dirname, 'public')));

// Define routes
app.get('/', function(req, res){
  res.send('<html><h1 style="color: red;">Hello world</h1></html>');
});

app.get('/static', (request, response) => {
  response.sendFile(path.join(__dirname, 'public', 'home-static.html'));
});

app.get('/profile', function(req, res){
  res.render('profile', { user: 'Coni' });
});

app.get('/profile/:name', function(req, res){
  res.render('profile', { user: req.params.name })
});

app.get('/blog', function(req, res){
  res.render('blog', { blog: { title: 'My first blog', popular: false } })
});

app.get('/blogs', function(req, res){
  res.render('blogs', { blogs: [
    { title: 'My first post', popular: false },
    { title: 'My second post', popular: false },
    { title: 'My third post', popular: true },
  ]})
});

// This one returns an error because we're not sending a product, and the view expects it
app.get('/product', function(req, res){
  res.render('product', { });
});

// You define error-handling middleware last, after other app.use() and routes calls
app.use((error, req, res, next) => {
  if (error) {
    res.render('error');
  } else {
    next();
  }
});

// Start server
const port = 4000;
const server = app.listen(port, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});

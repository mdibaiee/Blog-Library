var express = require('express'),
    app = express(),
    fs = require('fs');

app.use(express.static(__dirname + '/'))
app.use(express.bodyParser());

app.get('/list', function(req, res) {
  res.sendfile('books.json');
})

app.del('/list/:id', function(req, res) {
  var file = fs.readFileSync(__dirname + '/books.json');
  var json = JSON.parse(file);

  json = json.filter(function(object) {
    return object.id !== +req.params.id;
  })
  fs.writeFileSync(__dirname + '/books.json', JSON.stringify(json))
})

app.post('/list', function(req, res) {
  var file = fs.readFileSync(__dirname + '/books.json');
  var json = JSON.parse(file);

  json.push(req.body)
  
  fs.writeFileSync(__dirname + '/books.json', JSON.stringify(json));
})

app.listen(8000);

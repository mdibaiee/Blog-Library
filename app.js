var express = require('express'),
    fs = require('fs');

app = express();

app.use(express.static(__dirname + '/client'))
app.use(express.bodyParser());
app.listen(8000);

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


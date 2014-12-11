var express = require('express');
var app = express();
var request = require('request');
var cors = require('cors');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

console.log('loaded');
app.post('/github/auth_token', function(req, res) {
  var data = req.body.data;
  console.log(data);
  request.post('https://github.com/login/oauth/access_token', {json: data}, function(err, resp) {
  	console.log(resp);
  	if (err) {
  		return res.send(500, err);
  	}

  	console.log(resp.body);
    return res.json(resp.body);
  });
});

app.listen(8200);

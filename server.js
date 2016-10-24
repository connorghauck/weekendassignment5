var express =  require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var fave = require('./routes/fave');


app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static('public'));



app.use('/fave', fave);



app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, './public/views/index.html'));
});


var port = process.env.PORT || 3000;


var server = app.listen(port, function () {
    console.log('listening on port: ', server.address().port);
});

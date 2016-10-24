var router = require('express').Router();
var pg = require('pg');


var config = {
    database: 'gif'
};


var pool = new pg.Pool(config);

router.get('/', function (req, res) {
    pool.connect(function (err, client, done) {
        try {
            if (err) {
            res.sendStatus(500);
            return;
            }

        client.query('SELECT * FROM favorites',
            function (err, result) {
                if (err) {
                console.log('error querying db', err);
                res.sendStatus(500);
                return;
                }
                
                console.log('results.rows', result.rows);
                res.send(result.rows);
        });
        }   finally {
            done();
        }
  });
});

router.post('/', function (req, res) {
    console.log('in post function req', req.body);
    pool.connect(function (err, client, done) {
    console.log('req: ', req.body);
    try {
        if (err) {
            console.log("OH FUCK");
            res.sendStatus(500);
            return;
        }

        client.query('INSERT INTO favorites (comment, image) VALUES ($1, $2) RETURNING *;',
        [req.body.comment, req.body.image],
        function (err, result) {
            if (err) {
            console.log('issue querying the database', err);
            res.sendStatus(500);
            return;
            }
            console.log("IT WORKED!");
            res.send(result.rows);
        });
        }   finally {
        done();
        }
    });
});

module.exports = router;

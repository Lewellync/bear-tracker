var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
var Bear        = require('./app/models/bear');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

mongoose.connect('localhost', 'bears'); // connect to our database
var port = process.env.PORT || 8080;

// ROUTES FOR API
var router = express.Router();

// First route
router.use(function(req, res, next) {
  console.log('I\'m comin');
  next();
})

router.route('/bears')

  .post(function(req, res) {
    var bear = new Bear();
    bear.name = req.body.name;
    console.log('Bear name : ' + bear.name);

    bear.save(function(err, new_bear) {
      console.log('Bear Save');
      if (err)
        res.send(err);

      res.json(new_bear);
    });
  })

  .get(function(req, res) {
    Bear.find(function(err, bears) {
      if (err)
        res.send(err);

      res.json(bears);
    });
  });

router.route('/bears/:bear_id')

  .get(function(req, res) {
    Bear.findById(req.params.bear_id, function(err, bear) {
      if (err)
        res.send(err);

      res.json(bear);
    });
  })

  .put(function(req, res) {
    Bear.findById(req.params.bear_id, function(err, bear) {
      if (err)
        res.send(err)

      bear.name = req.body.name

      bear.save(function(err) {
        if (err)
          res.send(err)

        res.json({ message: 'Bear updated!' });
      });
    });
  })

  .delete(function(req, res) {
    Bear.remove({
      _id: req.params.bear_id
    }, function(err, bear) {
      if (err)
        res.send(err)

      res.json({ message: 'Successfully deleted' });
    });
  });

app.use('/api', router);

app.use(express.static('public'))

app.listen(port);
console.log('Magic happens on port ' + port);

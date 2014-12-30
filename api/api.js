//--------- CONFIG ----------//

// include required modules
var restify = require('restify'),
    mongoose = require('mongoose');

// create server
var server = restify.createServer({ name: 'wager-api' })
    server.listen(7000, function () {
    console.log('%s listening at %s', server.name, server.url)
});

// connect to db
db = mongoose.connect("mongodb://localhost/wager-api");

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectID;

// set user db schema
var User = new Schema({
    "password": String,
    "username": String,
    "email": String
});

var Bet = new Schema({
    "user_id": String,
    "list_id": Number,
    "list_name": String,
    "tags": String,
    "event_type": String,
    "event": String,
    "fixture": String,
    "bet_type": String,
    "selection": String,
    "bookmaker": String,
    "stake": Number,
    "price": Number,
    "outcome": String,
    "return": Number,
    "profit": Number
});

// create models
var User = mongoose.model('User', User);
var Bet = mongoose.model('Bet', Bet);

// set some response options
server
    .use(restify.fullResponse())
    .use(restify.bodyParser())
    .use(restify.queryParser()); //allow params to be parsed

// support cors
server.use(
    function crossOrigin(req, res, next){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        return next();
    }
);

//--------- USER API ----------//

// return all users
server.get('/api/user', function (req, res, next) {
    // by default, return all users
    var query = {}
    // if a 'query' param exists, parse the json string and refine the results
    if (req.params.query) {
        query = JSON.parse(req.params.query);
    };

    User.find(query, function (error, users) {
        res.send(users);
    });
});


// return single user
// example _id: 54982d73441dc9c0bed7149b
server.get('/api/user/:id', function (req, res, next) {
    User.findOne({ _id: req.params.id }, function (error, user) {
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
        if (user) {
            res.send(user)
        } else {
            res.send(404)
        }
    });
});


// create new user
server.post('/api/user', function (req, res, next) {
    // simple validation example
    if (req.params.email === undefined) {
        return next(new restify.InvalidArgumentError('Email must be supplied'))
    }
    
    var userData = {
        username: req.params.username,
        email: req.params.email,
        password: req.params.password
    };
    
    var user = new User(userData);
    user.save(function (error, data) {
        if (error) {
            return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
        } else {
            res.json(data);
        }
        res.send(201, user)
    });
});


// update user
// example _id: 54982d73441dc9c0bed7149b
server.put('/api/user/:id', function (req, res, next) {
    if (req.params.email === undefined) {
        return next(new restify.InvalidArgumentError('Email must be supplied'));
    }
    
    var userData = {
        username: req.params.username,
        email: req.params.email,
        password: req.params.password
    };
    
    User.update({ _id: req.params.id }, userData, {
        multi: false
    }, function (error, user) {
        if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
        res.send();
    });
});


// delete user
server.del('/api/user/:id', function (req, res, next) {
    User.remove({ _id: req.params.id }, function (error, user) {
        if (error) {
            return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)));
        }
        res.send();
    });
});



//--------- BET API ----------//

// return all bets
server.get('/api/bet/:uid', function (req, res, next) {
    // by default, return all bets
    var query = {}
    // if a 'query' param exists, parse the json string and refine the results
    if (req.params.query) {
        query = JSON.parse(req.params.query);
    } else {
        query = {user_id: req.params.uid};
    }

    Bet.find(query, function (error, bets) {
        res.send(bets);
    });
});


// return single bet
// example _id: 54982d73441dc9c0bed7149b
server.get('/api/bet/:id', function (req, res, next) {
    Bet.findOne({ _id: req.params.id }, function (error, bet) {
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
        if (bet) {
            res.send(bet)
        } else {
            res.send(404)
        }
    });
});


// create new bet
server.post('/api/bet', function (req, res, next) {
    // simple validation example
    if (req.params.bookmaker === undefined) {
        return next(new restify.InvalidArgumentError('bookmaker must be supplied'))
    }
    
    var betData = {
        user_id: req.params.user_id,
        list_id: req.params.list_id,
        list_name: req.params.list_name,
        tags: req.params.tags,
        event_type: req.params.event_type,
        event: req.params.event,
        fixture: req.params.fixture,
        bet_type: req.params.bet_type,
        selection: req.params.selection,
        bookmaker: req.params.bookmaker,
        stake: req.params.stake,
        price: req.params.price,
        outcome: req.params.outcome,
        return: req.params.return,
        profit: req.params.profit,
    };
    
    var bet = new Bet(betData);
    bet.save(function (error, data) {
        if (error) {
            return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
        } else {
            res.json(data);
        }
        res.send(201, bet)
    });
});


// update bet
// example _id: 54982aea39acde9ababb3560
server.put('/api/bet/:id', function (req, res, next) {
    var betData = {
        user_id: req.params.user_id,
        list_id: req.params.list_id,
        list_name: req.params.list_name,
        tags: req.params.tags,
        event_type: req.params.event_type,
        event: req.params.event,
        fixture: req.params.fixture,
        bet_type: req.params.bet_type,
        selection: req.params.selection,
        bookmaker: req.params.bookmaker,
        stake: req.params.stake,
        price: req.params.price,
        outcome: req.params.outcome,
        return: req.params.return,
        profit: req.params.profit
    };
    
    Bet.update({ _id: req.params.id }, betData, {
        multi: false
    }, function (error, bet) {
        if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
        res.send();
    });
});


// delete bet
server.del('/api/bet/:id', function (req, res, next) {
    Bet.remove({ _id: req.params.id }, function (error, bet) {
        if (error) {
            return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)));
        }
        res.send();
    });
});

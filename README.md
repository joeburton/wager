```
// start mongo
$ sudo mongod
```

```
// start node server
$ cd ~/Desktop/playground/wager/api
$ node api.js
```

or

`$ nodemon api.js`

```
// start mongodb console
$ mongo

// use db
use wager-api

// update 
db.bets.update({user_id: "54982aea39acde9ababb3560"},{ $set:{bookmaker: "Stan James"}})
```

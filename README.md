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
// watch for style changes
$ cd ~/Desktop/playground/wager/app/src
$ compass watch
```

```
// start mongodb console
$ mongo

// use db
use wager-api

// update 
db.bets.update({user_id: "54982aea39acde9ababb3560"},{ $set:{bookmaker: "Stan James"}})
```

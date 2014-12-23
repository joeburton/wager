// start mongo
$ sudo mongod

// start node server
$ cd ~/Desktop/playground/wager/api
$ node api.js

or

$ nodemon api.js

// start mongodb console
$ mongo



db
    wager-api

Collections
    users
    bets

Bet
    id :integer (unique)
    user_id :integer (unique)
    list_id :integer (unique)
    list_name :string
    date :timestamp
    tags :string (comma seperated list)

    competition_type :string (ie. football, boxing, etc)
    competition :string (ie. english premier league, IPL, wimbledon)
    event :string (ie. Froch v Groves, Palace v Southampton, etc)
    bet_type :string (ie. home/away/sbh/dnb/o2.5/outright.. etc)

    stake :number
    outcome :string (ie. win/lose/void)
    return :number
    profit :number (return - stake)

User
    id :integer (unique)
    username :string (unique)
    password :string
    email :string
    name :string


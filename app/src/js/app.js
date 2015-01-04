(function () {
    var app = angular.module('myApp', []);

    var USER_ID = "54982aea39acde9ababb3560";

    // use to generate unique bet id
    var uniqueToken = function generateQuickGuid() {
    return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
    }

    app.factory('dataFactory', ['$http', function($http) {
        var urlBase = 'http://localhost:7000/api/bet';
        var dataFactory = {};

        // CRUD operations

        dataFactory.getBets = function () {
            // var query = '{"user_id": "54982aea39acde9ababb3560"}';
            // return $http.get(urlBase + '?query=' + query);
            return $http.get(urlBase + '/' + USER_ID);
        };

        dataFactory.deleteBet = function (id) {
            return $http.delete(urlBase + '/' + id);
        };

        dataFactory.createBet = function (bet) {
            return $http.post(urlBase, bet);
        };

        dataFactory.updateBet = function (bet) {
            return $http.put(urlBase + '/' + bet.bet_id, bet)
        };

        return dataFactory;
    }]);

    app.controller('betController', ['$scope', 'dataFactory', function ($scope, dataFactory) {
        $scope.status;
        $scope.bets;
        
        // form values
        $scope.betId = '',
        $scope.created = 0,
        $scope.updated = 0,
        $scope.userId = USER_ID,
        $scope.listId = '1',
        $scope.listName = 'default',
        $scope.tags = '',
        $scope.eventType = '',
        $scope.event = '',
        $scope.fixture = '',
        $scope.betType = '',
        $scope.selection = '',
        $scope.bookmaker = '',
        $scope.stake = 0,
        $scope.price = 0,
        $scope.outcome = 'open',
        $scope.return = 0,
        $scope.profit = 0

        getBets();

        function getBets() {
            dataFactory.getBets()
                .success(function (bets) {
                    $scope.bets = bets;
                })
                .error(function (error) {
                    $scope.status = 'Unable to load data: ' + error.message;
                });
        }

        $scope.deleteBet = function (id, event) {
            event.preventDefault();

            dataFactory.deleteBet(id)
            .success(function () {
                $scope.status = 'Deleted Bet! Updating UI';
                for (var i = 0; i < $scope.bets.length; i++) {
                    var bet = $scope.bets[i];
                    if (bet.bet_id === id) {
                        $scope.bets.splice(i, 1);
                        break;
                    }
                }
            })
            .error(function (error) {
                $scope.status = 'Unable to delete bet: ' + error.message;
            });
        };

        $scope.createBet = function (bet) {
            dataFactory.createBet(bet)
                .success(function () {
                    $scope.status = 'Created Bet! Update UI.';
                    $scope.bets.push(bet);
                }).
                error(function(error) {
                    $scope.status = 'Unable to create bet: ' + error.message;
                });
        };

        $scope.updateBet = function (bet) {
            var bet;
            for (var i = 0; i < $scope.bets.length; i++) {
                var currBet = $scope.bets[i];
                if (currBet.bet_id === bet.bet_id) {
                    bet = currBet;
                    break;
                }
            }

            dataFactory.updateBet(bet)
              .success(function () {
                  $scope.status = 'Updated bet! Update UI';
              })
              .error(function (error) {
                  $scope.status = 'Unable to update bet: ' + error.message;
              });
        };

        $scope.submit = function() {
            var bet = {
                bet_id: uniqueToken(),
                created: Date.now(),
                updated: Date.now(),
                user_id: $scope.userId,
                list_id: parseFloat($scope.listId),
                list_name: $scope.listName,
                tags: $scope.tags,
                event_type: $scope.eventType,
                event: $scope.event,
                fixture: $scope.fixture,
                bet_type: $scope.betType,
                selection: $scope.selection,
                bookmaker: $scope.bookmaker,
                stake: parseFloat($scope.stake),
                price: parseFloat($scope.price),
                outcome: $scope.outcome,
                return: parseFloat($scope.return),
                profit: parseFloat($scope.profit)
            };

            $scope.createBet(bet);
        };

        $scope.resetForm = function (formSelector) {
            $(formSelector).find('input[type="text"]').val("");
        };

        $scope.updateOutcome = function (bet, outcome) {
            bet.outcome = outcome;
            bet.profit = $scope.calcProfit(bet);
            bet.return = $scope.calcReturn(bet);
            bet.updated = Date.now();

            $scope.updateBet(bet);
        }

        $scope.calcProfit = function (bet) {
            var profit = 0;

            if (!bet.outcome || bet.outcome === 'void') {
                console.log('void');
                profit = 0;

            // } else if (bet.freeBet) {
            //     console.log('winning freebet');
            //     profit += bet.stake;

            } else if (bet.outcome === 'win') {
                console.log('win');
                profit = bet.stake * bet.price;
            
            } else if (bet.outcome === 'lose') {
                console.log('lose');
                // if (!bet.freebet) {
                    profit = 0 - bet.stake;
                // }
            }

            return profit;
        }

        $scope.calcReturn = function (bet) {
            var rtn = bet.stake + bet.profit;
            return rtn; 
        }
    }]);

})();

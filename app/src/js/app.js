(function () {
    var app = angular.module('myApp', []);

    var USER_ID = "54982aea39acde9ababb3560";

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
            return $http.put(urlBase + '/' + bet._id, bet)
        };

        return dataFactory;
    }]);


    app.controller('betController', ['$scope', 'dataFactory', function ($scope, dataFactory) {
        $scope.status;
        $scope.bets;
        
        // form values
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
        $scope.stake = null,
        $scope.price = null,
        $scope.outcome = 'open',
        $scope.return = null,
        $scope.profit = null

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
                    if (bet._id === id) {
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
                if (currBet._id === bet._id) {
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
                user_id: $scope.userId,
                list_id: $scope.listId,
                list_name: $scope.listName,
                tags: $scope.tags,
                event_type: $scope.eventType,
                event: $scope.event,
                fixture: $scope.fixture,
                bet_type: $scope.betType,
                selection: $scope.selection,
                bookmaker: $scope.bookmaker,
                stake: $scope.stake,
                price: $scope.price,
                outcome: $scope.outcome,
                return: $scope.return,
                profit: $scope.profit
            };

            $scope.createBet(bet);
        };

        $scope.resetForm = function (formSelector) {
            $(formSelector).find('input[type="text"]').val("");
        };

        $scope.updateOutcome = function (bet, outcome) {
            bet.outcome = outcome;
            $scope.updateBet(bet);
        }
    }]);

})();

var app = angular.module('wagerApp', []);

var USER_ID = "54982aea39acde9ababb3560";

app.factory('dataFactory', ['$http', function($http) {
    var urlBase = 'http://localhost:7000/api/bet';
    var dataFactory = {};

    dataFactory.getBets = function () {
    	// var query = '{"user_id": "54982aea39acde9ababb3560"}';
     	// return $http.get(urlBase + '?query=' + query);
     	return $http.get(urlBase + '/' + USER_ID);
    };

    dataFactory.deleteBet = function (id) {
        return $http.delete(urlBase + '/' + id);
    };

    // dataFactory.getBet = function (id) {
    //     return $http.get(urlBase + '/' + id);
    // };

    // dataFactory.createBet = function (bet) {
    //     return $http.post(urlBase, bet);
    // };

    // dataFactory.updateBet = function (bet) {
    //     return $http.put(urlBase + '/' + bet._id, bet)
    // };


    return dataFactory;
}]);


app.controller('betController', ['$scope', 'dataFactory', function ($scope, dataFactory) {
    $scope.status;
    $scope.bets;
    $scope.bookmaker = '';

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

    $scope.deleteBet = function (id) {
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

    $scope.submit = function() {
          console.log($scope.bookmaker);
      };

    // $scope.updateCustomer = function (id) {
    //     var cust;
    //     for (var i = 0; i < $scope.customers.length; i++) {
    //         var currCust = $scope.customers[i];
    //         if (currCust.ID === id) {
    //             cust = currCust;
    //             break;
    //         }
    //     }

    //     dataFactory.updateCustomer(cust)
    //       .success(function () {
    //           $scope.status = 'Updated Customer! Refreshing customer list.';
    //       })
    //       .error(function (error) {
    //           $scope.status = 'Unable to update customer: ' + error.message;
    //       });
    // };

    // $scope.insertCustomer = function () {
    //     //Fake customer data
    //     var cust = {
    //         ID: 10,
    //         FirstName: 'JoJo',
    //         LastName: 'Pikidily'
    //     };
    //     dataFactory.insertCustomer(cust)
    //         .success(function () {
    //             $scope.status = 'Inserted Customer! Refreshing customer list.';
    //             $scope.customers.push(cust);
    //         }).
    //         error(function(error) {
    //             $scope.status = 'Unable to insert customer: ' + error.message;
    //         });
    // };



    // $scope.getCustomerOrders = function (id) {
    //     dataFactory.getOrders(id)
    //     .success(function (orders) {
    //         $scope.status = 'Retrieved orders!';
    //         $scope.orders = orders;
    //     })
    //     .error(function (error) {
    //         $scope.status = 'Error retrieving customers! ' + error.message;
    //     });
    // };
}]);
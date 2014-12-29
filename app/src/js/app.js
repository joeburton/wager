(function () {
    var myApp = angular.module('myApp', []);

    var UID = '54982aea39acde9ababb3560';

    myApp.factory('Api', function ($q, $http) {
        var api = {
            getBets: function(uid) {
                return $http.get('http://localhost:7000/api/bet?query={"user_id": "' + uid + '"}')
                // return $http.get({
                //     url: 'http://localhost:7000/api/bet', 
                //     method: "GET",
                //     params: {
                //         query: {"user_id": "54982aea39acde9ababb3560"}
                //     }
                // })
                .then(function (response) {
                    return response.data;
                });
            }
        };

        return api;
    });

    myApp.controller('betController', function ($scope, Api) {

        $scope.getBets = function(uid) {
            Api.getBets(UID) 
            .then(function(betData) {
                $scope.betData = betData;
            });
        };

        $scope.getBets();

    });

})();

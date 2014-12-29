var app = angular.module('customersApp', []);

app.factory('dataFactory', ['$http', function($http) {

    var urlBase = 'http://localhost:7000/api/user';
    var dataFactory = {};

    dataFactory.getCustomers = function () {
        return $http.get(urlBase);
    };

    // dataFactory.getCustomer = function (id) {
    //     return $http.get(urlBase + '/' + id);
    // };

    // dataFactory.insertCustomer = function (cust) {
    //     return $http.post(urlBase, cust);
    // };

    // dataFactory.updateCustomer = function (cust) {
    //     return $http.put(urlBase + '/' + cust.ID, cust)
    // };

    dataFactory.deleteCustomer = function (id) {
    	console.log("1: "+id);
        return $http.delete(urlBase + '/' + id);
    };

    // dataFactory.getOrders = function (id) {
    //     return $http.get(urlBase + '/' + id + '/orders');
    // };

    return dataFactory;
}]);








app.controller('customersController', ['$scope', 'dataFactory', 
        function ($scope, dataFactory) {

    $scope.status;
    $scope.customers;
    $scope.orders;

    getCustomers();

    function getCustomers() {
        dataFactory.getCustomers()
            .success(function (custs) {
                $scope.customers = custs;
            })
            .error(function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    }

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

    $scope.deleteCustomer = function (id) {
    	console.log("2: "+id);
        dataFactory.deleteCustomer(id)
        .success(function () {
            $scope.status = 'Deleted Customer! Refreshing customer list.';
            for (var i = 0; i < $scope.customers.length; i++) {
                var cust = $scope.customers[i];
                if (cust._id === id) {
                    $scope.customers.splice(i, 1);
                    break;
                }
            }
            $scope.orders = null;
        })
        .error(function (error) {
            $scope.status = 'Unable to delete customer: ' + error.message;
        });
    };

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
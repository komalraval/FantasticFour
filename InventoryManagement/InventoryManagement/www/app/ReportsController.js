(function () {
    "use strict";

    angular.module("myapp.controllers.Reports", ["chart.js"])

     .controller('ReportsController', ['$scope', '$state', '$http', '$ionicPopup', '$rootScope', function ($scope, $state, $http, $ionicPopup, $rootScope) {

         $scope.init = function () {
             $scope.polarData = {
                 labels: ["January", "February", "March", "April", "May", "June", "July"],
                 data: [65, 59, 80, 81, 56, 55, 40],
             };
         }

     }]);
})();
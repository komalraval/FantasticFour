(function () {
    "use strict";

    angular.module("myapp.controllers.Reports", ["chart.js"])

     .controller('ReportsController', ['$scope', '$state', '$http', '$ionicPopup', '$rootScope', function ($scope, $state, $http, $ionicPopup, $rootScope) {

         $scope.isTotalItem = true;
         $scope.labels = [];
         $scope.dataQuantity = [];
         $scope.dataCost = [];
         $scope.DisplayCriteria = {
             name: 'Total Item'
         };

         $scope.RadioButtonSelection = function () {
             $scope.init($scope.DisplayCriteria.name);
         }

         $scope.init = function (DisplayCriteria) {

             $http.get('http://localhost:53771/api/Inventory/GetListOfInventoryItems').success(function (dataItems) {

                 for (var i = 0; i < dataItems.length; i++) {

                     $scope.labels.push(dataItems[i].ItemName);

                     var string = dataItems[i].TotalItems;

                     var a = parseInt(string)
                     $scope.dataQuantity.push(a);


                     var costList = parseInt(dataItems[i].TotalCost);
                     $scope.dataCost.push(costList);


                 }

                 if (DisplayCriteria == "Total Item") {
                     $('#pieCost').hide();
                     $('#pie').show();
                     $scope.polarData = {
                         labels: $scope.labels,
                         data: $scope.dataQuantity
                     };
                 }
                 else {

                     $('#pie').hide();
                     $('#pieCost').show();
                     //$('#pie').reload();
                     $scope.polarData = {
                         labels: $scope.labels,
                         data: $scope.dataCost
                     };
                   
                 }

             });


         }

         $scope.goback = function (path) {
             $state.go(path);
         }
         $scope.export = function () {
             //    $http.get('http://localhost:53771/api/Reports/ExportReport/')

             //      .success(
             //          // success callback
             //          function (response) {
             //              alert(response);
             //          })
             //}

             $http({
                 method: "GET",
                 url: 'http://localhost:53771/api/Logins/ExportReport'

             })
                           .success(function (response) {
                               alert(response);
                           })
                           .error(function () {
                               alert("Please try again later..!!");
                           });
         };


     }]);
})();
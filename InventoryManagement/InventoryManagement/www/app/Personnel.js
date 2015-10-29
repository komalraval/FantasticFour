//(function () {
//    "use strict";

//    angular.module("myapp.controllers", [])
//            .controller("appCtrl", ["$scope", function ($scope) {
//            }])
//             .controller('Personnel', ['$scope', '$state', '$http', function ($scope, $state, $http) {
//                 alert("Rakhee personnel");
//                 $scope.changePasswordForm = {
//                     Absent: undefined,
//                     Present: undefined,
//                     date: undefined
//                 };
//                 $scope.init = function () {

//                 };
//                 $scope.Submit = function () {

//                     if ($scope.changePasswordForm.password == $scope.changePasswordForm.ReTypePassword) {
//                         var ModifyParameter = { "user_name": $scope.changePasswordForm.userName, "password": $scope.changePasswordForm.password }
//                         $http.put('http://localhost:2706/api/logins/ChangePassword', ModifyParameter)
//                             .success(function (data) {
//                                 alert("Your password is changed sucessfully..!!");
//                                 $state.go("login");
//                             })
//                             .error(function () {
//                                 alert("Error while creating Tenant");
//                                 $state.go("login");
//                             });
//                     }
//                     else {
//                         alert("Please provide valid password");
//                     }

//                 };
//             }])
//})();

(function () {
    "use strict";

    angular.module("myapp.controllers", [])

    .controller("appCtrl", ["$scope", function ($scope) {
    }])

        .controller('loginController', ['$scope', '$ionicPopup', '$state', '$http', function ($scope,$ionicPopup, $state, $http) {

            $scope.loginForm = {
                username: undefined,
                password: undefined,
                isLoggedInUser: undefined,
                UserID: undefined
      
            };
            $scope.init = function () {
        
            };
            $scope.buttonLoginClick = function () {

                //get UserID
                $http({
                    url: 'http://localhost:53771/api/logins/GetLoginsSucessUserID',
                    params: { user_name: $scope.loginForm.username, password: $scope.loginForm.password },
                    method: "GET"
                })
                .success(function (data) {
                    $scope.loginForm.UserID = data.User_ID;
                })
                .error(function () {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Error!',
                        template: "There is some problem with network , please try again later"
                    });
                })

                $http({
                    url: 'http://localhost:53771/api/logins/GetLoginsSucess',
                    params: { user_name: $scope.loginForm.username, password: $scope.loginForm.password },
                    method: "GET"
                })
                .success(function (data) {
                    //alert(data);
                    if (data) {
                        $state.go("menuList");
                    }
                    else {
                        //alert("UserName or Password is not correct, please try again");
                        var alertPopup = $ionicPopup.alert({
                            title: 'Error!',
                            template: "UserName or Password is not correct, please try again"
                        });
                        $state.go("login");
                    }
                })
               .error(function () {
                   var alertPopup = $ionicPopup.alert({
                       title: 'Error!',
                       template: "Network issue..!!"
                   });
               })

                
            };
        }])

        .controller('ForgotPassword', ['$scope', '$ionicPopup', '$state', '$http', function ($scope,$ionicPopup, $state, $http) {

            $scope.ForgotPassword = {
                userName: undefined

            };
            $scope.init = function () {

            };
            $scope.buttonChangePasswordClick = function () {

               
                var ModifyParameter = { "user_name": $scope.ForgotPassword.userName, "password": Math.floor(Math.random() * 90000) + 10000 }
                $http.put('http://localhost:53771/api/logins/ForgotPasswoord', ModifyParameter)
                        .success(function (data) {
                            var alertPopup = $ionicPopup.alert({
                                title: 'Error!',
                                template: "Your password is changed sucessfully, Please check your email..!!"
                            });
                            $state.go("login");
                        })
                        .error(function () {
                            var alertPopup = $ionicPopup.alert({
                                title: 'Error!',
                                template: "Some netowrk issue"
                            });
                            $state.go("login");
                        });

            };
        }])

         .controller('changePassword', ['$scope','$ionicPopup', '$state', '$http', function ($scope,$ionicPopup, $state, $http) {

             $scope.changePasswordForm = {
                 password: undefined,
                 ReTypePassword: undefined,
                 userName : undefined

             };
             $scope.init = function () {

             }; 
             $scope.buttonChangePasswordClick = function () {
                 
                 if ($scope.changePasswordForm.password == $scope.changePasswordForm.ReTypePassword)
                 {
                     var ModifyParameter = { "user_name": $scope.changePasswordForm.userName, "password": $scope.changePasswordForm.password }
                     $http.put('http://localhost:53771/api/logins/ChangePassword', ModifyParameter)
                         .success(function (data) {
                             var alertPopup = $ionicPopup.alert({
                                 title: 'Error!',
                                 template: "Your password is changed sucessfully..!!"
                             });
                             $state.go("login");
                         })
                         .error(function () {
                             var alertPopup = $ionicPopup.alert({
                                 title: 'Error!',
                                 template: "Network issue..!!"
                             });
                             $state.go("login");
                         });
                 }
                 else
                 {
                     var alertPopup = $ionicPopup.alert({
                         title: 'Error!',
                         template: "Please provide valid password"
                     });
                 }

             };
         }])

         //signup
        .controller('signUpController', ['$scope', '$ionicPopup','$state', '$http', function ($scope,$ionicPopup, $state, $http) {
            //debugger;
            var UserNameExitsOrNot;
            $scope.signUp = {
                FirstName: undefined,
                LastName: undefined,
                Email: "rakhee02singh@gmail.com",
                Gender: undefined,
                User_Profile: undefined,
                contactNumber: undefined,
                DOB: undefined,
                //UserNameExitsOrNot: undefined
                
            };
            $scope.init = function () {
                // debugger;
            };
            $scope.buttonSignUpClick = function () {
                
                $http({
                    method: 'GET',
                    dataType: 'json',
                    url: 'http://localhost:53771/api/logins/GetLogins'
                })
                .success(function (data) {
                    $scope.logins = data;
                });
                //check user is laready exists or not
                var login = { "user_name": $scope.signUp.Email }
                //$http.get('http://localhost:53771/api/logins/GetUserName', login)
                $http({
                    url: 'http://localhost:53771/api/logins/GetUserName',
                    params: { "user_name": $scope.signUp.Email },
                    method: "GET"
                })
                    .success(function (data) {
                        UserNameExitsOrNot = data;
                    })
                    .error(function () {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Error!',
                            template: "Network issue..!!"
                        });
                    })
                if (UserNameExitsOrNot == false && UserNameExitsOrNot != undefined) {
                    var parameters = {
                        "First_Name": $scope.signUp.FirstName, "Last_Name": $scope.signUp.LastName, "Mobile_Number": $scope.signUp.contactNumber,
                        "Email_ID": $scope.signUp.Email, "User_Type": $scope.signUp.User_Profile
                    }
                    $http.post('http://localhost:53771/api/user/SaveUser', parameters)
                        .success(function (data) {
                        })
                        .error(function () {
                            var alertPopup = $ionicPopup.alert({
                                title: 'Error!',
                                template: "Network issue..!!"
                            });
                        });
                    var passwordrandom = Math.floor(Math.random() * 90000) + 10000;;
                    var parameters = { "user_name": $scope.signUp.Email, "password": passwordrandom, "name": $scope.signUp.FirstName + $scope.signUp.LastName }
                    $http.post('http://localhost:53771/api/logins/savedata1', parameters)
                        .success(function (data) {
                        })
                        .error(function () {
                            var alertPopup = $ionicPopup.alert({
                                title: 'Error!',
                                template: "Network Issue..!!"
                            });
                        });
                    //modify
                    var ModifyParameter = { "user_name": "RakheeMofified2", "User_ID": "8" }
                    $http.put('http://localhost:53771/api/logins/UpdateData', ModifyParameter)
                        .success(function (data) {
                            
                        })
                        .error(function () {
                            
                        });

                    //login is sucessfull or not

                    var login = { "user_name": "John2", "User_ID": "8" }
                    //$http.get('http://localhost:53771/api/logins/GetLoginsSucess', login)
                    //    .success(function (data) {
                    //        alert("sucess" + data);
                    //    })
                    //    .error(function () {
                    //        alert("Error while creating Tenant");
                    //    });

                   // $http({
                    //     url: 'http://localhost:53771/api/logins/GetLoginsSucess',
                   //     params: { user_name: "John9", password: "Doe" },
                   //     method: "GET"
                   // })
                   // .success(function (data) {
                   //     alert("Login true");
                   // })
                   //.error(function () {
                   //    alert("Login false");
                   //});

                    var email = { "password": "John2" }
                    var strPassword = "Rakhee";
                    alert(passwordrandom);
                    // $http.post('http://localhost:53771/api/logins/sendEmailViaWebApi', email)
                    $http({
                        method: "POST",
                        url: 'http://localhost:53771/api/logins/sendEmailViaWebApi',
                        params: { password: passwordrandom, "user_name": $scope.signUp.Email}
                    })
                        .success(function (data) {
                            var alertPopup = $ionicPopup.alert({
                                title: 'Error!',
                                template: "Please check your email to verify"
                            });
                        })
                        .error(function () {
                            var alertPopup = $ionicPopup.alert({
                                title: 'Error!',
                                template: "Please try again later..!!"
                            });
                        });
                    $state.go("login");

                }
                else if(UserNameExitsOrNot != undefined) {
                    alert("Your email is already registered with us.");
                    $state.go("login");
                }
            }
        }])
        .controller('Personnel', ['$scope','$ionicPopup', '$state', '$http', function ($scope,$ionicPopup, $state, $http) {
            
            $scope.Personnel = {
                Absent: undefined,
                Present: undefined,
                date: undefined,
                userName: undefined
            };
            $scope.init = function () {

            };
            $scope.Submit = function () {
                var parameters = {
                    "Absent": $scope.Personnel.Absent, "present": $scope.Personnel.Present, "Date": $scope.Personnel.date, "User_ID": 1,
                    "User_Name": $scope.Personnel.userName
                }
                $http.post('http://localhost:53771/api/Personnel/SavePersonnel', parameters)
                        .success(function (data) {
                            var alertPopup = $ionicPopup.alert({
                                title: 'Sucess!',
                                template: "You attendence has been saved!"
                            });

                        })
                        .error(function () {
                           
                        });
                //rks
                window.navigator.geolocation.getCurrentPosition(show_map);
                function show_map(position) {
                    var latitude = position.coords.latitude;
                    var longitude = position.coords.longitude;
                    // Add code to show a map here
                }

                //rks
                
                $state.go("menuList");
            };
        }])
            //homeCtrl provides the logic for the home screen
            .controller("homeCtrl", ["$scope", "$state", function ($scope, $state) {
                $scope.refresh = function () {
                    //refresh binding
                    $scope.$broadcast("scroll.refreshComplete");
                };
            }])

            //errorCtrl managed the display of error messages bubbled up from other controllers, directives, myappService
            .controller("errorCtrl", ["$scope", "myappService", function ($scope, myappService) {
                //public properties that define the error message and if an error is present
                $scope.error = "";
                $scope.activeError = false;

                //function to dismiss an active error
                $scope.dismissError = function () {
                    $scope.activeError = false;
                };

                //broadcast event to catch an error and display it in the error section
                $scope.$on("error", function (evt, val) {
                    //set the error message and mark activeError to true
                    $scope.error = val;
                    $scope.activeError = true;

                    //stop any waiting indicators (including scroll refreshes)
                    myappService.wait(false);
                    $scope.$broadcast("scroll.refreshComplete");

                    //manually apply given the way this might bubble up async
                    $scope.$apply();
                });
            }]);
        })();
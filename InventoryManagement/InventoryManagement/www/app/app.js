(function () {
    "use strict";

    angular.module("myapp", ["ionic", "ionic-datepicker", "ionic.contrib.drawer", "myapp.controllers","myapp.controllers.Reports", "myapp.controllers.Inventory", "myapp.services"])
        .run(function ($ionicPlatform) {
            $ionicPlatform.ready(function () {
                if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }
                if (window.StatusBar) {
                    StatusBar.styleDefault();
                }
            });
        })
        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider

                 .state("login", {
                     url: "/login",
                     templateUrl: "app/templates/LoginView.html"

                 })
                //signup
                 .state("SignUp", {
                     url: "/SignUp",
                     templateUrl: "app/templates/SignUpView.html",
                     controller: "signUpController"
                 })

                //Modify Password
                .state("ModifyPassword", {
                    url: "/ModifyPassword",
                    templateUrl: "app/templates/ModifyPassword.html",
                    controller: "ForgotPassword"
                })

                //Personnel details
                 //Modify Password
                .state("Personnel", {
                    url: "/Personnel",
                    templateUrl: "app/templates/Personnel.html",
                    controller: "Personnel"
                })

                //ChangePassword
                 .state("changePassword", {
                     url: "/changePassword",
                     templateUrl: "app/templates/ChangePassword.html",
                     controller: "changePassword"
                 })

                .state("menuList", {
                    url: "/menuList",

                    templateUrl: "app/templates/MenuListView.html",
                    //controller: "appCtrl"
                })
             .state("inventory", {
                 url: "/inventory",

                 templateUrl: "app/templates/Inventory/inventoryListView.html",
                 controller: "inventoryController"
             })
              .state("inventoryItem", {
                  url: "/inventoryItem",

                  templateUrl: "app/templates/Inventory/inventoryItemView.html",
                  controller: "inventoryController"
              })
             .state("addInventoryItem", {
                 url: "/addInventoryItem",
                 templateUrl: "app/templates/Inventory/AddInventoryItemView.html",
                 controller: "inventoryController"
             })
             .state("report", {
                 url: "/report",
                 templateUrl: "app/templates/Reports/ReportStock.html",
                 controller: "ReportsController"
             })
            .state("app", {
                url: "/app",
                abstract: true,
                templateUrl: "app/templates/view-menu.html",
                controller: "appCtrl"
            })
            .state("app.home", {
                url: "/home",
                templateUrl: "app/templates/view-home.html",
                controller: "homeCtrl"
            });
            $urlRouterProvider.otherwise("/login");
        });
})();
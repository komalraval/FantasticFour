(function () {
    "use strict";

    angular.module("myapp.services", [])

        .factory("myappService", ["$rootScope", "$http", function ($rootScope, $http) {
            var myappService = {};

            //starts and stops the application waiting indicator
            myappService.wait = function (show) {
                if (show)
                    $(".spinner").show();
                else
                    $(".spinner").hide();
            };

            return myappService;
        }])

    .factory('GetOrSaveDataService', function () {
        var ID = {}
        function set(data) {
            ID = data;
        }
        function get() {
            return ID;
        }

        return {
            set: set,
            get: get
        }

    });
})();
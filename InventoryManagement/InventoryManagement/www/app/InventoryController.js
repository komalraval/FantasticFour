(function () {
    "use strict";

    angular.module("myapp.controllers.Inventory", [])


    .controller('inventoryController', ['$scope', '$state', '$http', '$ionicPopup', '$rootScope', 'GetOrSaveDataService', '$ionicTabsDelegate', function ($scope, $state, $http, $ionicPopup, $rootScope, GetOrSaveDataService, $ionicTabsDelegate) {

        $scope.ActualList = undefined;
        $scope.isVisibleCustomData = false;
        $scope.invetoryItemObject = {
            Price: undefined,
            Quantity: undefined,
            Location: undefined,
            UnitType: undefined,
            DateOfBuying: undefined,
            StoreName: undefined,
            ContactNumber: undefined,
            IdItem: undefined,
            IdDetails: undefined,
            ItemName: undefined
            // inventoryList : undefined
        };


        $scope.isUpdateViewEnable = undefined;
        $scope.isDeleteClickedOnDetailView = undefined;



        $scope.eventName = undefined;


        //-------------------Show Inventory Items -----------------------------//

        $scope.init = function () {

            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!

            var yyyy = today.getFullYear();
            if (dd < 10) {
                dd = '0' + dd
            }
            if (mm < 10) {
                mm = '0' + mm
            }
            var today = dd + '/' + mm + '/' + yyyy;

            $scope.todaysDate = today;


            // Web APi call to get list of items

            $http.get('http://localhost:53771/api/Inventory/GetListOfInventoryItems').success(function (data) {

                $scope.ActualList = data;
                $scope.listItems = data;


            });

        };

        $scope.showPopup = function () {
            $scope.data = {}
            var myPopup = $ionicPopup.show({
                template: '<input type="text" ng-model="data.inventoryItemName">',
                title: 'Add New Inventory Item',
                subTitle: 'Please enter item name',
                scope: $scope,
                buttons: [
                  { text: 'Cancel' },
                  {
                      text: '<b>Add</b>',
                      type: 'button',
                      onTap: function (e) {
                          if (!$scope.data.inventoryItemName) {
                              //don't allow the user to close unless he enters wifi password
                              e.preventDefault();
                          } else {
                              return $scope.data.inventoryItemName;
                          }
                      }
                  }
                ]
            });
            myPopup.then(function (res) {

                // alert($scope.data.inventoryItemName);
                if ($scope.data.inventoryItemName != undefined || $scope.data.inventoryItemName != "") {
                    //Add Item in inventory


                    var data = {
                        itemName: $scope.data.inventoryItemName
                    }
                    var itemName = $scope.data.inventoryItemName;
                    $http.post('http://localhost:53771/api/Inventory/SaveInventoryItemName/', data)

                    .success(
                        // success callback
                        function (response) {

                            var array = response.split(';');
                            if (array[0] == "Success") {
                                $scope.init();
                            }
                            if (array[0] == "Error") {

                                var alertPopup = $ionicPopup.alert({
                                    title: 'Error!',
                                    template: array[1]
                                });
                            }
                        }


                )
                }

            });

        };
        //    $rootScope.itemName = undefined;

        $scope.GoToItem = function (item) {

            $rootScope.IdItem = item.Id;
            if ($scope.eventName != "delete") {
                $rootScope.itemName = item.ItemName;
                $state.go('inventoryItem');
            }
        };


        $scope.AddInventoryItem = function () {

            var data = {
                Id: $rootScope.IdItem,
                Event: "Add"
            };

            GetOrSaveDataService.set(data);

            $state.go('addInventoryItem');
        }


        $scope.LoadAddOrUpdateView = function () {

            var data = GetOrSaveDataService.get();
            $scope.IsAddViewEnable = undefined;
            if (data.Event == "Update") {

                $scope.IsAddViewEnable = "No";
                $http.get('http://localhost:53771/api/Inventory/GetInventoryItemsDetailsById/' + data.Id).success(function (dataInventory) {


                    $scope.invetoryItemObject.Price = dataInventory.Price;
                    $scope.invetoryItemObject.Quantity = dataInventory.Quantity;
                    $scope.invetoryItemObject.Location = dataInventory.Location;
                    $scope.invetoryItemObject.UnitType = dataInventory.UnitType;
                    $scope.invetoryItemObject.DateOfBuying = dataInventory.DateOfBuying;
                    $scope.invetoryItemObject.Price = dataInventory.Price;
                    $scope.invetoryItemObject.IdItem = data.Id;
                    $scope.invetoryItemObject.IdDetails = dataInventory.IdDetails;
                    // $scope.invetoryItemObject.inventoryList = dataInventory.inventoryList;



                });
            }
            else if (data.Event == "Add") {
                //alert("Add");
                $scope.IsAddViewEnable = "Yes";
                $scope.invetoryItemObject.IdItem = data.Id;
                $scope.invetoryItemObject.ItemName = $rootScope.itemName;
            }

        }

        $scope.ResetData = function () {
            $scope.LoadAddOrUpdateView();

        }

        $scope.DeleteInventoryItem = function (item) {
            //alert("delete");
            var Id = item.Id;
            //   var Id = 16;
            $scope.eventName = "delete";

            var url = "http://localhost:53771/api/Inventory/DeleteInventoryItem/" + Id;
            $http({ method: 'DELETE', url: url })
              .success(function (data) {
                  //  alert(data);
                  var alertPopup = $ionicPopup.alert({
                      title: 'Success!',
                      template: 'Item is deleted successfully.'
                  });
                  $scope.init();
                  $scope.eventName = undefined;

              })
              .error(function (info) {

                  var alertPopup = $ionicPopup.alert({
                      title: 'Error!',
                      template: 'Failed to get list of environments from server'
                  });
              });


        }

        //------------Custom Date View For Inventory Items--------------------------//

        var datePickerCallback = function (val) {

            if (typeof (val) === 'undefined') {
                //   alert('No date selected');
            } else {

                $scope.datepickerObject.inputDate = val;
            }
        };

        var datePickerToDateCallback = function (val) {

            if (typeof (val) === 'undefined') {
                //alert('No date selected');
            } else {

                $scope.datepickerToObject.inputDate = val;
            }
        };

        $scope.datepickerToObject = {
            inputDate: new Date(),    //Optional

            callback: function (val) {    //Mandatory

                datePickerToDateCallback(val);
            }
        }

        $scope.datepickerObject = {

            inputDate: new Date(),    //Optional

            callback: function (val) {    //Mandatory

                datePickerCallback(val);
            }
        };


        $scope.GetDataOnCustomView = function () {
            $scope.errMessage = '';
            var curDate = new Date();
            var startDate = $scope.datepickerObject.inputDate;
            var endDate = $scope.datepickerToObject.inputDate;

            if (startDate.getDate() == endDate.getDate()) {

                $scope.errMessage = 'End Date should not be equal to start date';
                var alertPopup = $ionicPopup.alert({
                    title: 'Error!',
                    template: $scope.errMessage
                });
                return;
            }

            if (new Date(startDate) > curDate) {
                $scope.errMessage = 'Start date should not be before today.';
                var alertPopup = $ionicPopup.alert({
                    title: 'Error!',
                    template: $scope.errMessage
                });
                return;
            }

            if (new Date(startDate) > new Date(endDate)) {
                $scope.errMessage = 'End Date should be greater than start date';
                var alertPopup = $ionicPopup.alert({
                    title: 'Error!',
                    template: $scope.errMessage
                });
                return;
            }

            if ($scope.errMessage == '') {
                $scope.isVisibleCustomData = true;
                //$("#").hide();
                //$("#").show();

            }

        };

        $scope.ShowTodaysData = function (index) {

            $ionicTabsDelegate.select(index);
        };

        //------------------- Details Of Inventory Items-------------------------------//

        $scope.ShowInventoryItems = function () {
            //  alert($rootScope.itemName);


            var idList = $rootScope.IdItem;

            $http.get('http://localhost:53771/api/Inventory/GetListOfInventoryItemsDetails/').success(function (listInventoryItemDetails) {

                var array = [];
                for (var i = 0; i < listInventoryItemDetails.length; i++) {
                    if (listInventoryItemDetails[i].IdItem == idList) {
                        array.push(listInventoryItemDetails[i]);
                    }
                }

                $scope.Items = array;
                $scope.AcutualItems = array;

            });

        };

        $scope.GoToInventoryItem = function (item) {

            if ($scope.isDeleteClickedOnDetailView != true) {
                //alert("actual" + item.IdDetails);
                var data = {
                    Id: item.IdDetails,
                    Event: "Update"
                };
                GetOrSaveDataService.set(data);
                $state.go('addInventoryItem');
            }
        }

        $scope.SaveInventoryDetails = function () {

            if ($scope.IsAddViewEnable == "Yes") {

                //alert($scope.invetoryItemObject.IdItem);
                $http.post('http://localhost:53771/api/Inventory/AddInventoryItemDetails/', $scope.invetoryItemObject)

                .success(
                    // success callback
                    function (response) {

                        var array = response.split(';');
                        if (array[0] == "Success") {

                            //$scope.ShowInventoryItems();
                            var alertPopup = $ionicPopup.alert({
                                title: 'Success',
                                template: array[1]
                            });

                            $state.go('inventoryItem');
                        }
                        else if (array[0] == "Error") {
                            var alertPopup = $ionicPopup.alert({
                                title: 'Error!',
                                template: array[1]
                            });
                        }

                    })
            }

            else if ($scope.IsAddViewEnable == "No") {

                //alert($scope.invetoryItemObject.IdDetails);

                var objItem = $scope.invetoryItemObject;

                var url = "http://localhost:53771/api/Inventory/UpdateInventoryItemDetails/" + objItem;
                $http({ method: 'PUT', url: url })
                  .success(function (data) {
                      // alert(data);
                      //  $scope.eventName = undefined;
                      // $scope.init();
                      alert(data)
                  })
                  .error(function (info) {
                      alert('Failed to update item.');
                  });

                //    $http.post('http://localhost:53771/api/Inventory/UpdateInventoryItemDetails/', $scope.invetoryItemObject)

                //    .success(
                //        // success callback
                //        function (response) {
                //            alert(response);
                //            //var array = response.split(';');
                //            //if (array[0] == "Success") {
                //            //   // $scope.init();
                //            //}

                //        })

            }


        }

        $scope.DeleteInventoryItemDetails = function (item) {

            $scope.isDeleteClickedOnDetailView = true;
            var id = item.IdDetails;
            //alert(id);
            var url = "http://localhost:53771/api/Inventory/DeleteInventoryItemDetails/" + id;
            $http({ method: 'DELETE', url: url })
              .success(function (data) {
                  // alert(data);
                  $scope.isDeleteClickedOnDetailView = undefined;
                  var alertPopup = $ionicPopup.alert({
                      title: 'Success!',
                      template: 'Item has been deleted successfully.'
                  });
                  $scope.ShowInventoryItems();
              })
              .error(function (info) {

                  var alertPopup = $ionicPopup.alert({
                      title: 'Error!',
                      template: 'Failed to delete Inventory Item Details.'
                  });
              });
        }

        //----------------------Common - Filter----------------------------------------------//
        $scope.SearchByName = undefined;


        $scope.SearchData = function () {

            $scope.SearchByName = $('#SearchByName').val();

        };

        $scope.SearchDataInCustomView = function () {
            $scope.SearchByNameInCustomView = $('#SearchByNameInCustomView').val();
        };

        $scope.SearchDataInItemView = function () {
            $scope.SearchByNameItemView = $('#SearchByNameItemView').val();
        };

        $scope.$watch('SearchByNameItemView', function (newVal, oldVal) {

            if (newVal != oldVal) {
                $scope.filterDataItems($scope.SearchByNameItemView);
            }
        }, true);

        $scope.$watch('SearchByNameInCustomView', function (newVal, oldVal) {

            if (newVal != oldVal) {
                $scope.filterData($scope.SearchByNameInCustomView);
            }
        }, true);


        $scope.$watch('SearchByName', function (newVal, oldVal) {

            if (newVal != oldVal) {
                $scope.filterData($scope.SearchByName);
            }
        }, true);

        $scope.filterDataItems = function (searchText) {


            var ft = searchText.toLowerCase();

            var data = $scope.AcutualItems;

            var filteredData = data.filter(function (item) {

                return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
            });
            $scope.Items = filteredData;
        };

        $scope.filterData = function (searchText) {


            var ft = searchText.toLowerCase();

            var data = $scope.ActualList;

            var filteredData = data.filter(function (item) {

                return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
            });
            $scope.listItems = filteredData;
        };


        //-------------GoBack -----------------------------------------///

        $scope.GoBack = function (state) {
            $state.go(state);
        }

        //-------------------- On swipe-----------------//
        $scope.onSwipeLeft = function (item) {
            $ionicListDelegate.canSwipeItems(true);
            alert("hi");
        }


        $scope.reportEvent = function (event) {
            alert("hi");

            //event.preventDefault();
        };
    }])


        //Directive
    .directive('onSwipeLeft', function ($ionicGesture) {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                var gestureType = attrs.gestureType;
                switch (gestureType) {
                    case 'swipeRight':
                        $ionicGesture.on('swiperight', scope.reportEvent, elem);
                        break;
                    case 'swipeleft':
                        $ionicGesture.on('swipeleft', scope.reportEvent, elem);
                        break;
                    case 'doubletap':
                        $ionicGesture.on('doubletap', scope.reportEvent, elem);
                        break;
                    case 'tap':
                        $ionicGesture.on('tap', scope.reportEvent, elem);
                        break;
                }

            }
        }
    })
})();
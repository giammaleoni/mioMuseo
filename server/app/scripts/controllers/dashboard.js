'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('DashboardCtrl', function($scope, $state, DB, $firebaseObject, uiGridConstants) {

    $scope.$state = $state;

    $scope.userData = DB.getAuth();
    $scope.profile = DB.profile($scope.userData);
    //console.log($scope.userData);

    $scope.logout = function() {
      DB.unauth();
    };

    $scope.getUrl = function(uri) {
      return 'url(' + uri + ')';
    };

    $scope.save = function(newNickname, newProfilePic){

      //nickCambiato
      if (newNickname) {
        $scope.profile.nick = newNickname;
      }
      //immagine cambiata
      if (newProfilePic) {
        $scope.profile.pic = newProfilePic;
      }
      //qualcosa cambiato
      if (newNickname || newProfilePic) {
        $scope.profile.$save();
      }

    }

      // Test sortable
			$scope.names = [{val:'bob'},{val:'lucy'},{val:'john'},{val:'luke'},{val:'han'}];
			$scope.tempplayer;
			$scope.updateNames = function (tempplayer){
        if (tempplayer) {
          $scope.names.push({val:tempplayer});
        }
			};
			$scope.checkForNameDelete = function($index){
				if($scope.names[$index].val === ''){
					$scope.names.splice($index, 1);
				}
			};

      //onAuth routine
      DB.ref.onAuth(function(authData) {
        if (authData) {
          $scope.audioList = DB.audiolist(authData);
          console.log("Retrieving audiolist for user", authData.uid, $scope.audioList);
        }
      });

      $scope.gridOptions = {};
      $scope.gridOptions = {
        enableRowSelection: true,
        enableSelectAll: true,
        selectionRowHeaderWidth: 35,
        rowHeight: 35,
        showGridFooter:true,
        multiSelect: true,
        enableColumnResizing: true,
        enableCellEdit: false,
        //enableFullRowSelection: true
      };
      $scope.gridOptions.columnDefs = [
         {
           name: 'id',
           enableCellEdit: true,
           width: '10%',
           sort: {
             direction: uiGridConstants.ASC,
           },
         },
         { name: 'name',
         },
         { name: 'size',
         },
         { name: 'type',
         }
       ];

       $scope.gridOptions.data = [];

       $scope.$watch(
          function watchFoo( scope ) {
              // Return the "result" of the watch expression.
              return( scope.audioList.list );
          },
          function handleFooChange( newValue, oldValue ) {
              if (newValue) {
                // console.log( "New List:", newValue );
                $scope.gridOptions.data = newValue;
                for (var i = 0; i < newValue.length; i++) {
                  $scope.gridOptions.data.push(newValue[i]);
                }
              }
          },
          true
        );

      $scope.deleteSelected = function(){
        angular.forEach($scope.gridApi.selection.getSelectedRows(), function (data, index) {
            $scope.gridOptions.data.splice($scope.gridOptions.data.lastIndexOf(data), 1);
            for (var i = 0; i < $scope.audioList.uris.length; i++) {
              if (data.name == $scope.audioList.uris[i].name && data.size == $scope.audioList.uris[i].size) {
                $scope.audioList.uris.splice(i,1);
              }
            }
          });
      };

     $scope.gridOptions.onRegisterApi = function(gridApi){
      //set gridApi on scope
      $scope.gridApi = gridApi;
      gridApi.selection.on.rowSelectionChanged($scope,function(row){
        var msg = 'row selected ' + row.isSelected;
        // $log.log(msg);
        console.log(msg);
      });

      gridApi.selection.on.rowSelectionChangedBatch($scope,function(rows){
        var msg = 'rows changed ' + rows.length;
        // $log.log(msg);
        console.log(msg);
      });
    };

      $scope.saveList = function(){
        $scope.audioList.list = $scope.gridOptions.data;
        console.log($scope.audioList);
        $scope.audioList.$save();
      }


  });

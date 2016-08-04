'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('LoginCtrl', function($scope, $location, DB) {

    $scope.user;
    $scope.password;
    $scope.loading;

    // $scope.data = DB.data;
    // console.log($scope.data);

    $scope.submit = function(action) {

      $scope.loading = true;
      switch (action) {
        case 'login':
            if (!$scope.user || !$scope.password) {
              return false
            }
            $scope.error = DB.authUser($scope.user, $scope.password);
          break;
        case 'signup':
            if (!$scope.user || !$scope.password) {
              return false
            }
            DB.createUser($scope.user, $scope.password);
          break;
        case 'logout':
            DB.unauth();
          break;
        default:
      }
      //$scope.loading = false;

      //$location.path('/dashboard');

      return false;
    }

  });

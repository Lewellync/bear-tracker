var bearApp = angular.module('bearApp', ['ngMap']);

bearApp.controller('mapController', function($scope, $http) {
  var vm = this;

  $http.get('/api/bears')
    .success(function(data) {
      $scope.bears = data;
      console.log(data);
    })
    .error(function(data) {
      console.log('Error loading map bear');
    });
});

bearApp.controller('mainController', function ($scope, $http) {
  $scope.formData = {}

  $http.get('/api/bears')
    .success(function(data) {
      $scope.bears = data;
      console.log(data);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

  $scope.createBear = function() {

    // This is where address calculations should be done

    $http.post('/api/bears', $scope.formData)
      .success(function(data) {
        $scope.formData = {}
        $scope.bears.push(data);
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  }

  $scope.deleteBear = function(bear) {
    $http.delete('/api/bears/' + bear._id)
      .success(function(data) {
        var index = $scope.bears.indexOf(bear);
        $scope.bears.splice(index, 1)
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };
});

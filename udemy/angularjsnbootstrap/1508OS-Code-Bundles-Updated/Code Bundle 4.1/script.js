var module = angular.module('demoApp', ['ngMockE2E']).config(['$provide', function($provide) {
  $provide.decorator('$httpBackend', function($delegate) {
    var proxy = function(method, url, data, callback, headers) {
      var interceptor = function() {
        var _this = this,
          _arguments = arguments;
        setTimeout(function() {
          callback.apply(_this, _arguments);
        }, 2000);
      };
      return $delegate.call(this, method, url, data, interceptor, headers);
    };
    for(var key in $delegate) {
      proxy[key] = $delegate[key];
    }
    return proxy;
  });
}]).run(function($httpBackend){
  $httpBackend.whenPOST('/login').respond(function(method, url, data) {
    var details = angular.fromJson(data);
    if(details.email && details.email === 'test@test.com' && details.password && details.password === "test")
       return [200, {loggedIn: true, userid: 'testid'}, {}];
    else return [200, {loggedIn: false}, {}];
  });
  $httpBackend.whenGET(/^.*\.tpl\.html$/i).passThrough();
});
module.controller('MainCtrl', ['$scope', '$http', function($scope, $http){
  $scope.data = {};
  $scope.loading = false;
  $scope.postResult = 0;
  $scope.submit = function(){
    $scope.loading = true;
    $http.post('/login', $scope.data).success(function(data){
      $scope.loading = false;
      if(data.loggedIn) $scope.postResult = 1;
      else $scope.postResult = 2;
      console.log('result', data);
    });
  };
}]);
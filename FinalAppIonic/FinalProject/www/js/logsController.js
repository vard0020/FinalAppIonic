angular.module('starter.logsControllers', [])

.controller('logsCtrl', function($scope, $ionicModal, $timeout,$log,localStorageService,$location) {
	
	$scope.$on('$ionicView.enter', function () {

		if ($scope.isLogin()) {
			
			$scope.getAllLogs();
		} else {

			$log.debug("User is not logged In - Redirect to Menu");
			alert("Please login to see logs");
			$location.path("/app");
		}
	});

	$scope.isLogin = function () {

		var islogin = localStorageService.get('IS_LOGIN');
		return islogin;
	};
	
	$scope.getAllLogs= function(){
		
		$scope.logs = JSON.parse($log.getAllLogs());		
		
		console.log($scope.logs);
	}
});
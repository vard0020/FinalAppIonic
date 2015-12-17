angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$auth,localStorageService,$http,$log) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
	
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
//    console.log('Doing login', $scope.loginData);
	  $log.debug('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
	
	$scope.userLogin = function() {
		
		if(this.username == "Guest" || this.username == "guest"){
			
			alert("Guest is not allowed");
			$log.debug("Trying using guest Login but it is not allowed");
			
		}else if(this.password.length < 5){
			
			alert("Password must be more than 4 characters.");
			$log.debug("Password is too short");
			
		}else{
			
			$scope.username = this.username;
			$scope.image = "";
			localStorageService.set('IS_LOGIN',true);
			$log.debug("User Login - "+this.username);
			
			$scope.closeLogin();
		}
	};
	
	$scope.facebookLogin = function() {
      $auth.authenticate('facebook')
        .then(function(response) {
		  var token = response.access_token;
		  $log.debug('access token - '+token);

		  localStorageService.set('access_token',token);
		  localStorageService.set('IS_LOGIN',true);
		  
		  $scope.closeLogin();
		  
		  $scope.getUserDetails();

	  }).catch(function(response) {
		  $log.debug('Error - '+response.data);
		  
		  console.log(response.data);
        });
    };

    $scope.logout = function() {
		
		localStorageService.remove('access_token');	
		localStorageService.set('IS_LOGIN',false);
      	$auth.logout();
		
		$log.debug('User Logged Out - '+$scope.username);
		
		$scope.username = "";
		$scope.image = ""; 
		
		$scope.modal.show();
    };

    $scope.isAuthenticated = function() {
		
		var isLogin = localStorageService.get('IS_LOGIN');
		return isLogin;
    };
	
	$scope.getUserDetails = function(){
		
		var token = localStorageService.get('access_token');
		
		$http.get("https://graph.facebook.com/v2.2/me", { params: { access_token: token, fields: "id,name,picture", format: "json" }}).then(function(result) {
                //$scope.profileData = result.data;
			
			$scope.username = result.data.name;
			$scope.image = result.data.picture.data.url;
			console.log(JSON.stringify(result.data));

            }, function(error) {
                alert("There was a problem getting your profile.");
				$log.debug('Error - '+error);
            });
	};
});

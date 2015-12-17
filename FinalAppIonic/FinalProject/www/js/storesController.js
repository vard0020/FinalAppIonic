angular.module('starter.storeController', [])

.controller('storesCtrl', function($scope, SearchService, $location, localStorageService,$log) {
	
	$scope.$on('$ionicView.enter', function () {

		if ($scope.isLogin()) {
			
			$scope.getAllStores();
		} else {

			$log.debug("User is not logged In - Redirect to Menu");
			alert("Please login to search stores");
			$location.path("/app");
		}
	});

	$scope.isLogin = function () {

		var islogin = localStorageService.get('IS_LOGIN');
		return islogin;
	};

	$scope.getAllStores = function () {

		SearchService.allStores().then(function (response) {

			$scope.storeList = response.data.stores;

		});
	};

	$scope.SearchForStore = function () {

		if (!this.searchStore || this.searchStore === "") {

			alert("Please enter city to search");
			$log.debug("Search text is empty");
		} else {

			SearchService.searchStores(this.searchStore).then(function (response) {
				$scope.storeList = response.data.stores;
				if (response.data.products == 0) {

					alert("There is no store for given search.");
					$log.debug("There is no store for given search. - "+this.searchProduct);
				}
			});
		}
	};
});
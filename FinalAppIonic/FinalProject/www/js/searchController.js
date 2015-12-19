angular.module('starter.searchControllers', [])

.controller('searchCtrl', function ($scope, SearchService, $location, localStorageService,$log) {

	$scope.$on('$ionicView.enter', function () {

		if ($scope.isLogin()) {

			$scope.getAllProducts();
		} else {

			$log.debug("User is not logged In - Redirect to Menu");
			alert("Please login to search products");
			$location.path("/app");
		}
	});

	$scope.isLogin = function () {

		var islogin = localStorageService.get('IS_LOGIN');
		return islogin;
	};

	$scope.getAllProducts = function () {

		SearchService.allProduct().then(function (response) {

			$scope.productList = response.data.products;

		});
	};

	$scope.searchForProducts = function () {

		if (!this.searchProduct || this.searchProduct === "") {

			alert("Please enter product name to search");
			$log.debug("Search text is empty");
		} else {

			SearchService.searchProduct(this.searchProduct).then(function (response) {
				$scope.productList = response.data.products;
				if (response.data.products == 0) {

					alert("There is no product for given search.");
					$log.debug("There is no product for given search. - "+this.searchProduct);
				}
			});
		}
	};
});
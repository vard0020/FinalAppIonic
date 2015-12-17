angular.module('starter.searchService', [])

  .factory('SearchService', function($http,$log) {
    return{
		
		allProduct:function(){
			return $http({
					method: 'GET',
					url: 'http://api.bestbuy.com/v1/products?show=name,sku,salePrice,image,largeImage&pageSize=15&sort=customerReviewAverage.desc&format=json&apiKey=cqujq34r84bu9fgkh8h5ugkq'
				})
				.success(function (response) {
					return response.data;
				})
				.error(function (response) {
				
				$log.debug("Error - ",response.data);
					return response.data;
				});
		},
		
		searchProduct:function(product){
			var url = 'http://api.bestbuy.com/v1/products((search=' + product + '))?show=name,sku,salePrice,image,largeImage&pageSize=15&sort=customerReviewAverage.desc&format=json&apiKey=cqujq34r84bu9fgkh8h5ugkq';
			// Simple GET request example:
			return $http({
					method: 'GET',
					url: url
				})
				.success(function (response) {
					return response.data;
				})
				.error(function (response) {
					$log.debug("Error - ",response.data);
					return response.data;
				});
		},
		
		allStores:function(currentLocation){
			
			var url = 'http://api.bestbuy.com/v1/stores?format=json&apiKey=cqujq34r84bu9fgkh8h5ugkq';
			
			if (currentLocation) {
				url = 'http://api.bestbuy.com/v1/stores(area(' + currentLocation.latitude + ',' + currentLocation.longitude + ',1000))?format=json&apiKey=n3yt4tzd7r9gyruxdc6mtqpd';
			}

			return $http({
					method: 'GET',
					url: url
				})
				.success(function (response) {
					
					return response.data;
				})
				.error(function (response) {
					$log.debug("Error - ",response.data);
					return response.data;
				});

		},

		searchStores:function(store){
			var url = 'http://api.bestbuy.com/v1/stores(city=' + store + ')?format=json&apiKey=cqujq34r84bu9fgkh8h5ugkq';
			// Simple GET request example:
			return $http({
					method: 'GET',
					url: url
				})
				.success(function (response) {
					return response.data;
				})
				.error(function (response) {
					$log.debug("Error - ",response.data);
					return response.data;
				});
		}		
	}
	});
	
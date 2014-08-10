angular.module('Auth')
	.factory('Auth', ['$http', '$location', '$rootScope', '$cookieStore', '$alert', 
	function($http, $location, $rootScope, $cookieStore, $alert){
		$rootScope.currentUser = $cookieStore.get('user');
		$cookieStore.remove('user');
	
		return {
			login: function(user) {
				return $http.post('/api/login', user)
				.success(function(data){
					$rootScope.currentUser = data;
					$location.path('/');
					$alert({
						title: 'Hey!',
						content: "You're now logged in!",
						placement: 'top-right',
						type: 'success',
						duration: 3
					});
				})
				.error(function(){
					$alert({
						title: "Error!",
						content: "invalid",
						placement: "top-right",
						type: "failure",
						duration: 3
						
					})
				});
			},
			signup: function(user){
				return $http.post('/api/signup', user)
				.success(function(){
					$location.path('/login');
					$alert({
						title: 'Congratulations',
						content: "Your account has been created"
						placement: "top-right",
						type: "success",
						duration: 3
					});
				})
				.error(function(){
					$alert({
						title: "Error!",
						content: response.data,
						placement: "top-right",
						duration: 3
					});
				});
			},
			logout: function(user){
				return $http.get('/api/logout')
				.success(function(){
					$rootScope.currentUser = null;
					$cookieStore.remove('user');
					$alert({
						content: 'You have been logged out',
						placement: "top-right",
						type: "success",
						duration: 3
					});
				});
			}
	};
}]);

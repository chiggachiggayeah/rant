angular.module('MainController', []).controller('MainController', ['$scope','$http', function($scope, $http){
	$scope.formData = {};
	
	
	//will get on page load, rather than if this were in a particular function
	$scope.getRants = function(){
		$http.get('api/rants')
			.success(function(data){
				$scope.rants = data; //do i need to do any sort of parsing or am I good to go?
			})
			.error(function(data, status){
				$scope.rants = data || "Req failed";
				$scope.status = status;
			});
	};
	
	$scope.getRants();
	//timer function
	$scope.timer = function(){
		setTimeout(function(){
			$scope.createRant();
		}, 10000) //<- one minute
	};
	
	$scope.deleteRant = function(id){
		$http.delete('api/rants/' + id)
			.success(function(data){
				$scope.rants = data;				
				$scope.getRants();
				console.log(data);
			})
			.error(function(data, status){
				$scope.rants = data;
				console.log('Error' + data)
			});
			
	};

	$scope.createRant = function(){
		$http.post('api/rants', $scope.formData)
			.success(function(data){
				$scope.formData = {};
				$scope.rants.put(data);
			})
			.error(function(data){
				console.log('Error' + data);
			});
		$scope.getRants();
	};

	$scope.getTopics = function(){
		$http.get('topics/')
			.success(function(data){
				$scope.topics = data;
			})
			.error(function(data){
				console.log("Error" + data);
			})
	};

	$scope.createTopic = function(){
		$http.post('topics/', $scope.TFormData)
			.success(function(data){
				$scope.TFormData = {};
				$scope.topics.put(data);
			})
			.error(function(data){
				console.log('Error' + data);
			});
	};

	$scope.getRantsOnTopic = function(topic_id){
		$http.get('topics/' + topic_id + '/rants')
			.success(function(data){
				$scope.rants = data;
			})
			.error(function(data){
				console.log('Error' + data);
			});
	};

	//will need to get rid of form following submit
}])

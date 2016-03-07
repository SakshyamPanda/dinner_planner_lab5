dinnerPlannerApp.controller('OverviewCtrl', function ($scope, $location, Dinner) {
	$scope.go = function ( path ) {
	    $location.path( path );
	};

	$scope.menu =  Dinner.getDinnerMenu();

    $scope.getDishTotalPrice = function(dish) {
		return Dinner.getDishTotalPrice(dish);
	}

	$scope.getNumberOfGuests = function() {
    	return Dinner.getNumberOfGuests();
  	}
});
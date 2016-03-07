dinnerPlannerApp.controller('PreparationCtrl', function ($scope, $location, Dinner) {
	$scope.go = function ( path ) {
	    $location.path( path );
	};

	$scope.menu =  Dinner.getDinnerMenu();	

    $scope.getNumberOfGuests = function() {
    	return Dinner.getNumberOfGuests();
  	}
});
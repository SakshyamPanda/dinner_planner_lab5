dinnerPlannerApp.controller('OverviewCtrl', function ($scope, Dinner) {
	$scope.menu = function() {
       return Dinner.getDinnerMenu();
    }

    $scope.getDishTotalPrice = function(dish) {
		return Dinner.getDishTotalPrice(dish);
	}
});
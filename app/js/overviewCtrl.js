// Dinner controller that we use whenever we want to display detailed
// information for one dish
dinnerPlannerApp.controller('OverviewCtrl', function ($scope, Dinner) {
	$scope.menu = function() {
       return Dinner.getDinnerMenu();
    }

    $scope.getDishTotalPrice = function(dish) {
		return Dinner.getDishTotalPrice(dish);
	}
});
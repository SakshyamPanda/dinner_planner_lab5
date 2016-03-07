dinnerPlannerApp.controller('PreparationCtrl', function ($scope, Dinner) {
	$scope.menu = function() {
       return Dinner.getDinnerMenu();
    }
});
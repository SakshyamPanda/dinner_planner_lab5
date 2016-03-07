// Dinner controller that we use whenever we want to display detailed
// information for one dish
dinnerPlannerApp.controller('DishCtrl', function ($scope, $location, $routeParams, Dinner) {
  
    // TODO in Lab 5: you need to get the dish according to the routing parameter
	// $routingParams.paramName
	// Check the app.js to figure out what is the paramName in this case
	$scope.getNumberOfGuests = function() {
       return Dinner.getNumberOfGuests();
    }

	Dinner.Dish.get( {id:$routeParams.dishId} ,function(data){
		$scope.dish = data;
		console.log($scope.dish);
		// Dinner.pendingDish = data;
		
	},function(data){
		$scope.status = "There was an error";
	});
		
	// console.log("outside: "+$scope.dish);

	$scope.getDishTotalPrice = function(dish) {
		return Dinner.getDishTotalPrice(dish);
	}

	$scope.backToSelectDish = function () {
	    $location.path( "/search" );
	};

	$scope.confirmDish = function (dish) {
		Dinner.addDishToMenu(dish);
	    $location.path( "/search" );
	};
});
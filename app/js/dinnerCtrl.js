// Dinner controller that we use whenever we have view that needs to 
// display or modify the dinner menu
dinnerPlannerApp.controller('DinnerCtrl', function ($scope, $location, Dinner) {

  $scope.go = function ( path ) {
    $location.path( path );
  };

  $scope.numberOfGuests = Dinner.getNumberOfGuests();

  $scope.setNumberOfGuests = function(number){
    Dinner.setNumberOfGuests(number);
  }

  $scope.getNumberOfGuests = function() {
    return Dinner.getNumberOfGuests();
  }

  // TODO in Lab 5: Implement the methods to get the dinner menu
  // add dish to menu and get total menu price
  $scope.menu = function() {
    return Dinner.getDinnerMenu();
  }

  $scope.getDinnerMenu = function() {
  	return Dinner.menu;
  }

  $scope.addDishToMenu = function(dish) {
  	Dinner.addDishToMenu(dish);
  }

  $scope.getTotalMenuPrice = function() {
  	return Dinner.getTotalMenuPrice();
  }

  $scope.getDishTotalPrice = function(dish) {
    return Dinner.getDishTotalPrice(dish);
  }

});
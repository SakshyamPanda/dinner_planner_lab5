// Dinner controller that we use whenever we have view that needs to 
// display or modify the dinner menu
dinnerPlannerApp.controller('DinnerCtrl', function ($scope, $location, Dinner) {

  $scope.go = function ( path ) {
    $location.path( path );
  };

  $scope.numberOfGuests = Dinner.getNumberOfGuests();

  $scope.menu = Dinner.getDinnerMenu();

  $scope.pendingDish = function(){
    return Dinner.getPendingDish();
  }

  $scope.setNumberOfGuests = function(number){
    Dinner.setNumberOfGuests(number);
  }

  $scope.getNumberOfGuests = function() {
    return Dinner.getNumberOfGuests();
  }

  $scope.getDinnerMenu = function() {
  	return Dinner.menu;
  }

  $scope.addDishToMenu = function(dish) {
  	Dinner.addDishToMenu(dish);
  }

  $scope.removeDishFromMenu = function(dish) {
    Dinner.removeDishFromMenu(dish);
  }

  $scope.getTotalMenuPrice = function() {
  	return Dinner.getTotalMenuPrice();
  }

  $scope.getDishTotalPrice = function(dish) {
    return Dinner.getDishTotalPrice(dish);
  }

});
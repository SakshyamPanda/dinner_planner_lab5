// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner',function ($resource) {
  
  var numberOfGuests = 2;
  var menu = [];
  var pendingDish = {};


  this.setNumberOfGuests = function(num) {
    if(num < 1){
      numberOfGuests = 1;
    }
    else{
      numberOfGuests = num;
    }
  }

  this.getNumberOfGuests = function() {
    return numberOfGuests;
  }

  // TODO in Lab 5: Add your model code from previous labs
  // feel free to remove above example code
  // you will need to modify the model (getDish and getAllDishes) 
  // a bit to take the advantage of Angular resource service
  // check lab 5 instructions for details
  this.getDinnerMenu = function() {
    return menu;
  }

  this.addDishToMenu = function(dish) {
    var newDish = dish;

    for(key in menu){
      if(menu[key].Category === newDish.Category){
        menu.splice(key, 1);
      }else{
        // do nothing
      }
    }

    menu.push(newDish);
  }

  this.removeDishFromMenu = function(dish) {
    for (key in menu){
      var dish = menu[key];

      if(dish.RecipeID == id){
        menu.splice(key, 1);
        break;
      }
      else{
        // do nothing
      }
    }
  }

  this.getTotalMenuPrice = function() {
    var totalMenuPrice = 0;
    //console.log("this.getTotalMenuPrice menu: "+ menu);

    for(key in menu){
      var dish = menu[key];
      console.log("getTotalMenuPrice id: "+dish);

      var thisDishPrice = this.getDishTotalPrice(dish);
      totalMenuPrice += thisDishPrice;
    }

    //console.log("totalMenuPrice: "+ totalMenuPrice);
    return totalMenuPrice;  
  }

  this.getDishTotalPrice = function (dish) {
    // console.log("getDishTotalPrice id: "+dish.RecipeID);
    var dishTotalPrice = 0; 

    if(dish){
      if(dish.Ingredients){
        var allIngredients = dish.Ingredients;
        console.log("allIngredients: "+allIngredients);

        for(key in allIngredients){
          console.log("ingredient: "+allIngredients[key]);
          console.log("ingredient.Quantity: "+allIngredients[key].Quantity);
          dishTotalPrice += Number(allIngredients[key].Quantity)* 1 * numberOfGuests;
          console.log("dishTotalPrice: "+dishTotalPrice);
        }
      }else{
        // do nothing
      }
    }else{
      // do nothing
    }

    return dishTotalPrice;
  }

  // getAllDishes
	this.DishSearch = $resource('http://api.bigoven.com/recipes',{pg:1,rpp:25,api_key:'r02x0R09O76JMCMc4nuM0PJXawUHpBUL'});

  // getDish
	this.Dish = $resource('http://api.bigoven.com/recipe/:id',{api_key:'r02x0R09O76JMCMc4nuM0PJXawUHpBUL'}); 

	//console.log(DishSearch);
	

  // Angular service needs to return an object that has all the
  // methods created in it. You can consider that this is instead
  // of calling var model = new DinnerModel() we did in the previous labs
  // This is because Angular takes care of creating it when needed.
  return this;

});
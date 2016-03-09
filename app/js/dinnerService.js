// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner',function ($resource, $cookieStore) {
  
  var BIGOVEN_API_KEY = "sV1fPGQKrO0b6oUYb6w9kLI8BORLiWox";

  var numberOfGuests = 2;
  var menu = [];  // save the whole dish object
  var pendingDish = {};

  this.setNumberOfGuests = function(num) {
    if(num < 1){
      numberOfGuests = 1;
    }
    else{
      numberOfGuests = num;
    }

    // save to cookie
	  $cookieStore.put('numberOfGuests', numberOfGuests);
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
    console.log("getDinnerMenu: "+menu);
    return menu;
  }

  this.addDishToMenu = function(dish) {
    var newDish = dish;

    for(key in menu){
      if(menu[key].Category === newDish.Category){
        menu.splice(key, 1);
        menuCookie.splice(key, 1);
      }else{
        // do nothing
      }
    }

    menu.push(newDish);
    menuCookie.push(newDish.RecipeID);
    console.log("addDishToMenu: menuCookie: "+menuCookie);

    // save dish id in the menu into cookie
    $cookieStore.put('menuCookie', menuCookie);
  }

  this.removeDishFromMenu = function(dish) {
    for (key in menu){
      var existedDish = menu[key];

      if(existedDish.RecipeID == dish.RecipeID){
        menu.splice(key, 1);
        menuCookie.splice(key, 1);
        break;
      }
      else{
        // do nothing
      }
    }

    // save dish id in the menu into cookie
    $cookieStore.put('menuCookie', menuCookie);
    console.log("removeDishFromMenu: menuCookie: "+menuCookie);
  }

  this.setPendingDish = function(dish){
      // console.log("setPendingDish");
      // console.log(dish);
      pendingDish = dish;
  }

  this.getPendingDish = function(){
    // console.log("getPendingDish");
    // console.log(pendingDish);
    return pendingDish;
  }

  this.getTotalMenuPrice = function() {
    var totalMenuPrice = 0;
    //console.log("this.getTotalMenuPrice menu: "+ menu);

    for(key in menu){
      var dish = menu[key];
      // console.log("getTotalMenuPrice id: "+dish);

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
        // console.log("allIngredients: "+allIngredients);

        for(key in allIngredients){
          // console.log("ingredient: "+allIngredients[key]);
          // console.log("ingredient.Quantity: "+allIngredients[key].Quantity);
          dishTotalPrice += Number(allIngredients[key].Quantity).toPrecision(2) * 1 * numberOfGuests;
        }
      }else{
        // do nothing
      }
    }else{
      // do nothing
    }

    // console.log("dishTotalPrice: "+dishTotalPrice);
    return dishTotalPrice;
  }


  // Get data by sending request to server via API
  // getAllDishes
  this.DishSearch = $resource('http://api.bigoven.com/recipes',{pg:1,rpp:25,api_key:BIGOVEN_API_KEY});

  // getDish
  this.Dish = $resource('http://api.bigoven.com/recipe/:id',{api_key:BIGOVEN_API_KEY}); 

  // load the values from the cookie store the first time 
  // you create the variables that store your number of guest and menu
  var numberOfGuestsInCookie = $cookieStore.get('numberOfGuests');

  if(numberOfGuestsInCookie){
      numberOfGuests = numberOfGuestsInCookie;
  }else{
      // do nothing
  }
  
  var menuCookie = $cookieStore.get('menuCookie');  // save dish id only

  if(menuCookie){
    var oldMenuCookie = menuCookie;
    menuCookie = [];  // empty menuCookie

    for(key in oldMenuCookie){
      var dishID = oldMenuCookie[key];

      // get dish from server
      var self = this;
      this.Dish.get( {id:dishID} ,function(data){
        self.addDishToMenu(data);
      },function(data){
        // do nothing if error
      });
    }
  }else{
    menuCookie = [];
  }
	
  // Angular service needs to return an object that has all the
  // methods created in it. You can consider that this is instead
  // of calling var model = new DinnerModel() we did in the previous labs
  // This is because Angular takes care of creating it when needed.
  return this;

});